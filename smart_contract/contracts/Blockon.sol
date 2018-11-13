pragma solidity ^0.4.24;
import "./Account.sol";
import "./BaseContract.sol";

contract Blockon {

    /**
     * @dev createAccount 함수 호출시 발행, 입력된 퍼블릭어드레스와 그 어드레스와 연동된 어카운트 계약 주소를 반환
     * @param publicAddress 어카운트를 생성할 퍼블릭 어드레스
     * @param accountAddress 해당 퍼블릭 어드레스에 대해 생성된 account 계약의 주소 
     */
    event CreateAccount(address indexed publicAddress, address accountAddress);

    event CreateContract(address indexed agentAccount, address indexed sellerAccount, address indexed buyerAccount, address baseContract);

    /**
     * @dev 유효한 contract type인지를 검사
     * @param contractType 1 - 매매, 2 - 전세, 3 - 월세
     */
    modifier validContractType(uint8 contractType) {
        require(contractType == uint8(1) || contractType == uint8(2) || contractType == uint8(3), "Invalid contract type");
        _;
    }

    address owner;  //Blockon을 배포한 퍼블릭어드레스

    /**
     * @dev 블락콘을 배포한 퍼블릭 어드레스인지인지 확인
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller have to be owner(service address)");
        _;
    }

    /**
     * @dev 생성자. Blockon을 배포한 퍼블릭 어드레스를 onwer에 저장
     */
    constructor() public {
        owner = msg.sender;
    } 

    /**
     * @dev 퍼블릭어드레스와 연동되는 새로운 Account 스마트 컨트랙트를 생성하고, 데이터베이스에 추가한다.
     * @param publicAddress 생성할 어카운트 소유주의 퍼블릭 어드레스
     */
    function createAccount(address publicAddress) public onlyOwner() {
        require(publicAddress != address(0), "public address should not be empty");
        Account account = new Account(publicAddress);
        // 생성된 어카운트 주소를 이벤트로 찍어야지 외부에서 어카운트 계정의 주소를 확인할수 있다.
        emit CreateAccount(publicAddress, account);
    }

    /**
     * @dev 새로운 계약을 생성하고, 중개인, 매도인, 매수인의 Account에 계약을 추가한다.
     * @param agentAccount 중개인의 Account 스마트컨트랙트 주소
     * @param sellerAccount 매도인의 Account 스마트컨트랙트 주소
     * @param buyerAccount 매수인의 Account 스마트컨트랙트 주소
     * @param contractType 계약의 종류, 1 - 월세, 2 - 전세, 3 - 매매
     */
    function createContract(Account agentAccount, Account sellerAccount, Account buyerAccount, uint8 contractType) 
        public 
        validContractType(contractType) {
        require(agentAccount != address(0), "agent account should not be empty");
        require(sellerAccount != address(0), "seller account should not be empty");
        require(buyerAccount != address(0), "buyer account should not be empty");

        require(agentAccount != sellerAccount, "agent account and seller account should not be same");
        require(agentAccount != buyerAccount, "agent account and buyer account should not be same");
        require(sellerAccount != buyerAccount, "seller account and buyer account should not be same");

        require(agentAccount.isAgent() == true, "agent account have to be athorized as a agent");
        
        BaseContract newContract = new BaseContract(agentAccount, sellerAccount, buyerAccount, contractType);

        agentAccount.addContract(newContract);
        sellerAccount.addContract(newContract);
        buyerAccount.addContract(newContract);

        emit CreateContract(agentAccount, sellerAccount, buyerAccount, newContract);
    }

    /**
     * @dev 중개인 인증을 완료한 어카운트에 대해서, 어카운트 컨트랙트에 중개인이라고 표시를 한다.
     * @param accountAddress 중개인 인증을 할 account 계약 계정 주소
     */
    function athorizeAsAgent(Account accountAddress) public onlyOwner() {
        require(accountAddress != address(0), "Account address is empty");
        accountAddress.athorizeAsAgent();
    }
}