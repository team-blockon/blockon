pragma solidity ^0.4.24;
import "./Account.sol";

// 백엔드에서 이루어 질 것
contract DB {

    struct UserData {
        address publicAddress;
        string email;
        Account accountAddress;
        bool isAgent; // true: 중개인 인증시
        bool exists;
    }

    mapping(string => address) emailToAddress;   // 유저의 이메일 => 유저의 이더리움 주소
    mapping(address => UserData) userDatas; // 유저의 이더리움 주소 => 해당 유저의 정보

    // 새로운 유저데이터를 추가
    function addUserData(address _publicAddress, string _email, Account _accountAddress) public {
        // 테이블 초기화
        emailToAddress[_email] = _publicAddress;
        
        UserData storage userData = userDatas[_publicAddress];
        userData.publicAddress = _publicAddress;
        userData.email = _email;
        userData.accountAddress = _accountAddress;
        userData.exists = true;
    }

    // 인풋 : 유저의 이메일, 아웃풋 : 유저의 어카운트 스마트컨트랙트 주소
    function getUserAccount(string _email) public view returns (Account _accountAddress) {
        address publicAddress = emailToAddress[_email];
        return getUserAccount(publicAddress);
    }

    // 인풋 : 유저의 이더리움 주소, 아웃풋 : 유저의 어카운트 스마트컨트랙트 주소
    function getUserAccount(address _publicAddress) public view returns (Account _accountAddress) {
        UserData memory userData = userDatas[_publicAddress];
        return userData.accountAddress;    
    }

    // 해당 퍼블릭 어드레스를 사용하는 유저의 존재 확인
    function isExist(address _publicAddress) public view returns (bool) {
        return userDatas[_publicAddress].exists;
    }

    // 해당 퍼블릭 어드레스를 사용하는 유저의 존재 확인
    function isExist(string _email) public view returns (bool) {
        return userDatas[emailToAddress[_email]].exists;
    }

    // 어카운트의 타입을 중개인으로 변경
    function athorizeAsAgent(address _publicAddress) public {
        userDatas[_publicAddress].isAgent = true;
    }

    // 어카운트의 타입을 중개인으로 변경
    function athorizeAsAgent(string _email) public {
        userDatas[emailToAddress[_email]].isAgent = true;
    }
}