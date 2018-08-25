pragma solidity ^0.4.24;
import "./Account.sol";

contract BaseContract {
    address public agentID;
    address public sellerID;
    address public buyerID;
    uint8 public contractType;
    uint8 public contractState;
    
    /**
     * @dev 중개인, 매도인, 매수인의 어카운트 주소를 입력받아서 상태변수를 초기화시킨다
     * @param agentAccount 중개인의 Account 스마트컨트랙트 주소
     * @param sellerAccount 매도인의 Account 스마트컨트랙트 주소
     * @param buyerAccount 매수인의 Account 스마트컨트랙트 주소
     * @param _contractType 계약의 종류, 1 - 매매, 2 - 전,월세
     */
    constructor(Account agentAccount, Account sellerAccount, Account buyerAccount, uint8 _contractType) public {
        agentID = agentAccount.publicAddress();
        buyerID = sellerAccount.publicAddress();
        sellerID = buyerAccount.publicAddress();
        contractType = _contractType;
        
        // 기본상태 1, 계약금 입금 상태
        // 프론트엔드에서 상태가 1일때 1이 완료된것으로 인식하는것이 아니라
        // 1이 진행중이라고 인식을 한다. 1이완료되서 상태 2로 넘어가면 1이완료되고,
        // 상태 2가 진행중으로 뜨는 것이다.
        // 그렇기 때문에 처음의 상태는 1로 초기화를 해주어야 한다.
        contractState = uint8(1);  
    }

    /**
     * @dev 계약의 상태를 변경한다
     * @param newState 변경 할 상태(매매의 경우 1,2,3,4 / 전월세의 경우 1,3,5)
     *                  1 - 계약금 입금
     *                  2 - 중도금 입금
     *                  3 - 잔금 입금
     *                  4 - 등기 등록 신청
     *                  5 - 확정일자 
     *                  100 - 완료
     */
    function changeState(uint8 newState) public {
        contractState = newState;
    }
    
}