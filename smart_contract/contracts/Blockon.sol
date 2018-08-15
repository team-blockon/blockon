pragma solidity ^0.4.24;
import "./DB.sol";
import "./Account.sol";

contract Blockon {

    DB dataBase;

    constructor() public {
        dataBase = new DB();
    }

    /**
     * @dev 이더리움 주소와 연동되는 새로운 Account 스마트 컨트랙트를 생성하고, 데이터베이스에 추가한다.
     * @param publicAddress 생성할 어카운트 소유주의 이더리움 퍼블릭 어드레스
     * @param email 생성할 어카운트 소유주의 email 주소
     */
    function createAccount(address publicAddress, string email) public {
        
        // 해당 퍼블릭 어드레스와 연동되는 어카운트가 이미 있는지 확인
        assert(dataBase.isExist(publicAddress) == false);

        // create account
        Account account = new Account(publicAddress);
    
        // add to database
        dataBase.addUserData(publicAddress, email, account);
    }

    /**
     * @dev 새로운 계약을 생성하고, 중개인, 매도인, 매수인의 Account에 계약을 추가한다.
     * @param agentID 중개인의 Account 스마트컨트랙트 주소
     * @param sellerID 매도인의 Account 스마트컨트랙트 주소
     * @param buyerID 매수인의 Account 스마트컨트랙트 주소
     * @param contractType 계약의 종류, 1 - 매매, 2 - 전,월세
     */
    function createContract(address agentID, address sellerID, address buyerID, uint8 contractType) public {

        // 주소가 빈입력인지 확인
        assert(agentID != address(0));
        assert(sellerID != address(0));
        assert(buyerID != address(0));

        // 각 주소가 다른 주소인지 확인
        assert(agentID != sellerID);
        assert(agentID != buyerID);
        assert(sellerID != buyerID);

        // 각 주소에 대한 어카운트가 존재하는 어카운트인지 확인
        require(dataBase.isExist(agentID) == true, "agentID doesn't exist");
        require(dataBase.isExist(sellerID) == true, "sellerID doesn't exist");
        require(dataBase.isExist(buyerID) == true, "buyerID doesn't exist");

        // 새로 추가할 계약
        BaseContract newContract = new BaseContract(agentID, sellerID, buyerID, contractType);

        // add new contract to each account
        dataBase.getUserAccount(agentID).addContract(newContract);
        dataBase.getUserAccount(sellerID).addContract(newContract);
        dataBase.getUserAccount(buyerID).addContract(newContract);
    }

}