pragma solidity ^0.4.24;
import "./Account.sol";

contract BaseContract {

    event ConfirmChangeState(address indexed accountAddress, uint8 contractState);
    event Revocation(address indexed accountAddress, uint8 contractState);
    event Execution(address indexed contractAddress, uint8 contractState);
    event ExecutionFailure(address indexed contractAddress, uint8 contractState);

    Account public agentAccount;
    Account public sellerAccount;
    Account public buyerAccount;
    uint8 public contractType;
    uint8 public contractState;

    // contractState => (accountAddress => bool)
    mapping (uint8 => mapping (address => bool)) public confirmations;

    // contractState => bool
    mapping (uint8 => bool) public isExecuted;

    /**
     * @dev caller가 _contractState에 대해 컨펌을 이미 했다는것을 확인
     */
    modifier confirmed(uint8 _contractState, address caller) {
        require(confirmations[_contractState][caller] == true, "Caller have not confirmed this contract");
        _;
    }

    /**
     * @dev caller가 _contractState에 대해 컨펌을 안했다는것을 확인
     */
    modifier notConfirmed(uint8 _contractState, address caller) {
        require(confirmations[_contractState][caller] != true, "Caller already confirmed this contract state");
        _;
    }

    /**
     * @dev caller가 이 BaseContract 인스턴스에 연관된 어카운트인지 검사
     */
    modifier relatedAccount(address caller) {
        require(caller == address(agentAccount) || 
            caller == address(sellerAccount) || 
            caller == address(buyerAccount), 
            "Caller is not related account with this contract");
        _;
    }

    /**
     * @dev _contractState를 이미 거쳐갔는지 확인
     */
    modifier notExecuted(uint8 _contractState) {
        require(isExecuted[_contractState] == false, "This contract state have already been executed");
        _;
    }
    
    /**
     * @dev 중개인, 매도인, 매수인의 어카운트 주소를 입력받아서 상태변수를 초기화시킨다
     * @param _agentAccount 중개인의 Account 스마트컨트랙트 주소
     * @param _sellerAccount 매도인의 Account 스마트컨트랙트 주소
     * @param _buyerAccount 매수인의 Account 스마트컨트랙트 주소
     * @param _contractType 계약의 종류, 1 - 매매, 2 - 전세, 3 - 월세
     */
    constructor(Account _agentAccount, Account _sellerAccount, Account _buyerAccount, uint8 _contractType) public {
        agentAccount = _agentAccount;
        sellerAccount = _sellerAccount;
        buyerAccount = _buyerAccount;
        contractType = _contractType;
        
        // 기본상태 0
        contractState = uint8(0);
    }

    /**
     * @dev newState로 상태를 변환하는것에 동의한다.
     */
    function confirmChangeState(uint8 newState) 
        public 
        relatedAccount(msg.sender)
        notConfirmed(newState, msg.sender) {
        confirmations[newState][msg.sender] = true;
        emit ConfirmChangeState(msg.sender, newState);
        executeChangeState(newState);
    }

    /**
     * @dev newState로 상태를 변환하는것에 동의했던것을 철회한다.
     * 아직 newState로 상태변환이 일어나지 않았을때만 가능하다
     */
    function revokeConfirmation(uint8 newState)
        public
        relatedAccount(msg.sender)
        confirmed(newState, msg.sender)
        notExecuted(newState) {
        confirmations[newState][msg.sender] = false;
        emit Revocation(msg.sender, newState);
    }

    /**
     * @dev 모두에게 동의받았는지를 확인 후, 그렇다면 changeState 함수를 호출한다.
     */
    function executeChangeState(uint8 newState) 
        internal
        notExecuted(newState) {
        if(isConfirmed(newState)) {     // 모두에게 동의받았다면
            changeState(newState);      // changeState 실행
            emit Execution(this, newState);
        } else {
            emit ExecutionFailure(this, newState);
        }
    }

    /**
     * @dev 모두에게 동의를 받았다면 true를, 아니면 false를 반환한다.
     */
    function isConfirmed(uint8 newState) internal view returns (bool) {
        if(confirmations[newState][address(agentAccount)] && 
        confirmations[newState][address(sellerAccount)] && 
        confirmations[newState][address(buyerAccount)] ) {
            return true;
        } else {
            return false;
        }
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
    function changeState(uint8 newState) internal {
        isExecuted[newState] = true;    // 실행 했음 표시
        contractState = newState;

        // 상태변화가 완료되었다는 것을 계약 당사자들의 account 계약계정에 알림
        agentAccount.emitChangeContractStateEvent(this);
        buyerAccount.emitChangeContractStateEvent(this);
        sellerAccount.emitChangeContractStateEvent(this);
    }
    
    //
    // front와 연동을 위한 부분
    //
    /**
     * @dev caller가 _contractState를 confirm했으면 true를 리턴, 아니면 false 리턴
     */
    function hasConfirmed(uint8 _contractState) 
        public view 
        relatedAccount(msg.sender)
        returns (bool) {
        return confirmations[_contractState][msg.sender];
    }

    /**
     * @dev _contractState로 이미 변경이 되었다면 true, 아니면 false를 리턴
     */
    function hasExecuted(uint8 _contractState)
        public view
        relatedAccount(msg.sender)
        returns (bool) {
        return isExecuted[_contractState];
    }
}