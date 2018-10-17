pragma solidity ^0.4.24;
import "./BaseContract.sol";

contract Account {

    /**
     * @dev 컨트랜트가 추가되거나, 컨트랙트의 상태가 변경되었을 때 이벤트 발행
     * @param updateType 업데이트의 종류
     *                      1 - addContract
     *                      2 - changeContractState
     * @param contractIndex 업데이트된 컨트랙트의 인덱스                    
     */
    event UpdateContract(uint8 updateType, uint contractIndex);

    event AddContract(address indexed publicAddress, address contractAddress);
    event ConfirmChangeContractState(address indexed publicAddress, uint contractIndex, uint8 confirmedState);
    event RevokeConfirmation(address indexed publicAddress, uint contractIndex, uint8 revokedState);
    event AthorizeAsAgent(address indexed publicAddress);

    address public publicAddress;   // 이더리움 퍼블릭 어드레스
    bool public isAgent;            // true이면 중개인
    BaseContract[] contracts;       // 해당 유저가 포함된 계약의 주소 리스트
    address owner;                  // 어카운트를 생성한 blockon 계약 계정이 저장될것

    // 계약주소의 reverse lookup table
    // 기본값이 0이므로, 인덱스를 1부터 저장한다
    // contracts 리스트에 접근할때는 인덱스-1을 하여 접근
    mapping(address => uint) contractIndices;   

    /**
     * @dev 어카운트를 생성한 blockon 계약 계정인지 확인
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller have to be owner(blockon contract)");
        _;
    }

    /**
     * @dev 유효한 contract state인지 검사
     *      1 - 계약금 입금
     *      2 - 중도금 입금
     *      3 - 잔금 입금
     *      4 - 등기 등록 신청
     *      5 - 확정일자 
     *      100 - 완료
     */
    modifier validContractState(uint8 contractState) {
        require(contractState == 1 ||
            contractState == 2 ||
            contractState == 3 ||
            contractState == 4 ||
            contractState == 5 ||
            contractState == 100,
            "Invalid contract state"
        );
        _;
    }

    /**
     * @dev 생성자. Account 계약 계정을 생성한 blockon 계약 계정의 주소를 저장한다.
     * @param _publicAddress Account 계약 계정의 주인 이더리움 퍼블릭 어드레스
     */
    constructor(address _publicAddress) public {
        publicAddress = _publicAddress;
        owner = msg.sender;
    } 

    /**
     * @dev 새로운 계약을 추가하고, contractIndices를 업데이트한다. UpdateContract 이벤트를 발행한다.
     * @param contractAddress 추가할 계약의 주소
     */
    function addContract(BaseContract contractAddress) 
        public
        onlyOwner {
        require(contractIndices[contractAddress] == 0, "account has already had that base contract");

        contracts.push(contractAddress);
        contractIndices[contractAddress] = contracts.length;

        // 컨트랙트가 추가 됐음을 알림. 외부참조
        emit UpdateContract(uint8(1), contracts.length - 1);

        emit AddContract(publicAddress, contractAddress);
    }

    /**
     * @dev 컨트랙트의 상태를 변경하는것에 동의한다. 
     * 프론트엔드에서는 컨트랙트에 해당하는 인덱스만 알고있으므로, 이 함수를 호출한다.
     * @param index 상태를 변경할 컨트랙트의 인덱스
     * @param newContractState 변경 할 상태(매매의 경우 1,2,3,4 / 전월세의 경우 1,3,5)
     *                      1 - 계약금 입금
     *                      2 - 중도금 입금
     *                      3 - 잔금 입금
     *                      4 - 등기 등록 신청
     *                      5 - 확정일자 
     *                      100 - 완료
     */
    function confirmToChangeContractStateAt(uint index, uint8 newContractState) 
        public
        validContractState(newContractState) {
        require(index < contracts.length, "contracts array : index out of bound");
        confirmToChangeContractState(contracts[index], newContractState);
    }

    /**
     * @dev 컨트랙트의 상태를 변경하는것에 동의한다.
     * 중개, 매도, 매수인이 모두 이 함수를 호출해야 상태가 변경될것이다.
     * @param contractAddress 상태를 변경할 컨트랙트의 주소
     * @param newContractState 변경 할 상태(매매의 경우 1,2,3,4 / 전월세의 경우 1,3,5)
     *                      1 - 계약금 입금
     *                      2 - 중도금 입금
     *                      3 - 잔금 입금
     *                      4 - 등기 등록 신청
     *                      5 - 확정일자 
     *                      100 - 완료
     */
    function confirmToChangeContractState(BaseContract contractAddress, uint8 newContractState) 
        public
        validContractState(newContractState) {
        require(contractIndices[contractAddress] != 0, "contract address doesn't exist");
        contractAddress.confirmChangeState(newContractState);
    }

    /**
     * @dev 상태변경에 동의했던것을 취소한다.
     * @param index 상태 변경을 취소할 컨트랙트의 인덱스
     * @param contractStateToRevoke 취소할 컨트랙트 상태
     */
    function revokeConfirmationAt(uint index, uint8 contractStateToRevoke)
        public
        validContractState(contractStateToRevoke) {
        require(index < contracts.length, "contracts array : index out of bound");
        revokeConfirmation(contracts[index], contractStateToRevoke);
    }

    /**
     * @dev 상태변경에 동의했던것을 취소한다.
     * @param contractAddress 상태 변경을 취소할 컨트랙트의 주소
     * @param contractStateToRevoke 취소할 컨트랙트 상태
     */
    function revokeConfirmation(BaseContract contractAddress, uint8 contractStateToRevoke) 
        public 
        validContractState(contractStateToRevoke) {
        require(contractIndices[contractAddress] != 0, "contract address doesn't exist");
        contractAddress.revokeConfirmation(contractStateToRevoke);
    }

    /**
     * @dev 중개인으로 인증을 한 어카운트를 표시한다. AthorizeAsAgent 이벤트를 발행한다.
     * Blockon계정에서 Account를 생성하므로, Blockon계정만 사용 할 수 있다.
     */
    function athorizeAsAgent() 
        public
        onlyOwner {
        isAgent = true;
        emit AthorizeAsAgent(publicAddress);
    }

    //
    // BaseContarct에서 상태변경이 완료된후, 프론트에 알리기위해 호출할 함수들
    //
    /**
     * @dev 컨트랙트의 상태 변경에 동의가 완료된후, 이벤트를 발행한다.
     */
    function emitConfirmChangeContractStateEvent(BaseContract contractAddress, uint8 confirmedState) public {
        emit ConfirmChangeContractState(publicAddress,  contractIndices[contractAddress] - 1, confirmedState);
    }

    /**
     * @dev 컨트랙트의 상태 변경에 동의에대한 취소가 완료된후, 이벤트를 발행한다.
     */
    function emitRevokeConfirmationEvent(BaseContract contractAddress, uint8 revokedState) public {
        emit RevokeConfirmation(publicAddress, contractIndices[contractAddress] - 1, revokedState);
    }

    /**
     * @dev BaseContract 계약계정에서 상태 변경을 완료 한 후, 이벤트를 발행하기 위해 Account 계약계정에 알림
     * @param contractAddress 상태가 변경된 BaseContract 계약 계정 주소
     */
    function emitChangeContractStateEvent(BaseContract contractAddress) public {
        emit UpdateContract(uint8(2), contractIndices[contractAddress] - 1);
    }

    //
    // 프론트와 연동을 하기 위한 함수들  
    //
    /**
     * @dev contracts 리스트의 길이에 대한 getter
     * @return uint contracts 리스트의 길이
     */
    function getContractsLength() public view returns (uint) {
        return contracts.length;
    }

    /**
     * @dev 해당 인덱스의 계약에대한 정보를 받아오는 함수
     * @param index 참조하고 싶은 계약의 index
     * @return contractType 계약의 종류
     * @return contractState 계약의 상태
     */
    function getContractInfoAt(uint index) public view returns (uint8 contractType, uint8 contractState) {
        return getContractInfo(contracts[index]);
    }

    /**
     * @dev 해당 컨트랙트 주소에 대한 정보를 받아오는 함수
     * @param contractAddress 참조하고 싶은 계약의 주소
     * @return contractType 계약의 종류
     * @return contractState 계약의 상태
     */
    function getContractInfo(BaseContract contractAddress) internal view returns (uint8 contractType, uint8 contractState) {
        contractType = contractAddress.contractType();
        contractState = contractAddress.contractState();
    }

    /**
     * @dev index에 해당하는 BaseContract 계약 계정에 대해서, contractState를 confirm했는지 확인
     * @param index 확인하고 싶은 BaseContract의 index
     * @param contractState 확인하고 싶은 BaseContract의 계약 상태
     * @return confirm했다면 true, 아니면 false
     */
    function hasConfirmed(uint index, uint8 contractState) 
        public view 
        returns (bool isAgentConfirmed, bool isSellerConfirmed, bool isBuyerConfirmed) {
        return contracts[index].hasConfirmed(contractState);
    }

    /**
     * @dev index에 해당하는 BaseContract 계약 계정에 대해서, contractState로 이미 변경하였는지 확인
     * @param index 확인하고 싶은 BaseContract의 index
     * @param contractState 확인하고 싶은 BaseContract의 계약 상태
     * @return 이미 변경됬다면 true, 아니면 false
     */
    function hasExecuted(uint index, uint8 contractState) public view returns (bool) {
        return contracts[index].hasExecuted(contractState);
    }
}