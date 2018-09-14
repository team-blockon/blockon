pragma solidity ^0.4.24;
import "./Account.sol";

contract BaseContract {
    Account public agentAccount;
    Account public sellerAccount;
    Account public buyerAccount;
    uint8 public contractType;
    uint8 public contractState;
    
    /**
     * @dev 중개인, 매도인, 매수인의 어카운트 주소를 입력받아서 상태변수를 초기화시킨다
     * @param _agentAccount 중개인의 Account 스마트컨트랙트 주소
     * @param _sellerAccount 매도인의 Account 스마트컨트랙트 주소
     * @param _buyerAccount 매수인의 Account 스마트컨트랙트 주소
     * @param _contractType 계약의 종류, 1 - 월세, 2 - 전세, 3 - 매매
     */
    constructor(Account _agentAccount, Account _sellerAccount, Account _buyerAccount, uint8 _contractType) public {
        agentAccount = _agentAccount;
        buyerAccount = _sellerAccount;
        sellerAccount = _buyerAccount;
        contractType = _contractType;
        
        // 기본상태 1, 계약금 입금 상태
        // 프론트엔드에서 상태가 1일때 1이 완료된것으로 인식하는것이 아니라
        // 1이 진행중이라고 인식을 한다. 1이완료되서 상태 2로 넘어가면 1이완료되고,
        // 상태 2가 진행중으로 뜨는 것이다.
        // 그렇기 때문에 처음의 상태는 1로 초기화를 해주어야 한다.
        contractState = uint8(1);  
    }

    /**
     * @dev 계약의 상태를 변경한다. 상태가 변경되었다고 각 어카운트에 알린다.
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

        // 상태변화가 완료되었다는 것을 계약 당사자들의 account 계약계정에 알림
        agentAccount.emitChangeContractStateEvent(this);
        buyerAccount.emitChangeContractStateEvent(this);
        sellerAccount.emitChangeContractStateEvent(this);
    }
    
}