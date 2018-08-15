pragma solidity ^0.4.24;

contract BaseContract {
    address public agentID;
    address public buyerID;
    address public sellerID;
    uint8 public contractType;
    uint8 public contractState;
    
    constructor(address _agentID, address _buyerID, address _sellerID, uint8 _contractType) public {
        agentID = _agentID;
        buyerID = _buyerID;
        sellerID = _sellerID;
        contractType = _contractType;
    }

    /**
     * @dev 계약의 상태를 변경한다
     * @param newState 변경 할 상태(매매의 경우 1,2,3,4 / 전월세의 경우 1,3,5)
     *                  1 - 계약금 입금
     *                  2 - 중도금 입금
     *                  3 - 잔금 입금
     *                  4 - 등기 등록 신청
     *                  5 - 확정일자 
     */
    function changeState(uint8 newState) public {
        contractState = newState;
    }
    
}