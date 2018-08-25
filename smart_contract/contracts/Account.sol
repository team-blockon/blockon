pragma solidity ^0.4.24;
import "./BaseContract.sol";

contract Account {

    address public publicAddress;   // 이더리움 퍼블릭 어드레스
    bool public isAgent;            // true이면 중개인
    BaseContract[] contracts;       // 해당 유저가 포함된 계약의 주소 리스트

    // 계약주소의 reverse lookup table
    // 기본값이 0이므로, 인덱스를 1부터 저장한다
    // contracts 리스트에 접근할때는 인덱스-1을 하여 접근
    mapping(address => uint) contractIndices;   
    
    /**
     * @dev 컨트랜트가 추가되거나, 컨트랙트의 상태가 변경되었을 때 이벤트 발행
     * @param updateType 업데이트의 종류
     *                      1 - addContract
     *                      2 - changeContractState
     * @param contractIndex 업데이트된 컨트랙트의 인덱스                    
     */
    event UpdateContract(uint8 updateType, uint contractIndex);

    constructor(address _publicAddress) public {
        publicAddress = _publicAddress;
    } 

    /**
     * @dev 새로운 계약을 추가하고, contractIndices를 업데이트한다. UpdateContract 이벤트를 발행한다.
     * @param contractAddress 추가할 계약의 주소
     */
    function addContract(BaseContract contractAddress) public {
        // 이미 추가된 주소인지 확인한다
        assert(contractIndices[contractAddress] == 0);

        contracts.push(contractAddress);
        contractIndices[contractAddress] = contracts.length;

        emit UpdateContract(uint8(1), contracts.length - 1);
    }

    /**
     * @dev 컨트랙트의 상태를 변경한다. 중개인만 사용가능.
     * @param index 상태를 변경할 컨트랙트의 인덱스
     * @param newContractState 변경 할 상태(매매의 경우 1,2,3,4 / 전월세의 경우 1,3,5)
     *                      1 - 계약금 입금
     *                      2 - 중도금 입금
     *                      3 - 잔금 입금
     *                      4 - 등기 등록 신청
     *                      5 - 확정일자 
     *                      100 - 완료
     */
    function changeContractStateAt(uint index, uint8 newContractState) public {
        if(isAgent) {
            changeContractState(contracts[index], newContractState);
        }
    }

    /**
     * @dev 컨트랙트의 상태를 변경하고, UpdateContract 이벤트를 발행한다. 중개인만 사용가능
     * @param contractAddress 상태를 변경할 컨트랙트의 주소
     * @param newContractState 변경 할 상태(매매의 경우 1,2,3,4 / 전월세의 경우 1,3,5)
     *                      1 - 계약금 입금
     *                      2 - 중도금 입금
     *                      3 - 잔금 입금
     *                      4 - 등기 등록 신청
     *                      5 - 확정일자 
     *                      100 - 완료
     */
    function changeContractState(BaseContract contractAddress, uint8 newContractState) public {
        if(isAgent) {
            contractAddress.changeState(newContractState);
            emit UpdateContract(uint8(2), contractIndices[contractAddress] - 1);
        }
    }

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
     * @dev 중개인으로 인증을 한 어카운트를 표시한다.
     * (Blockon계정에서 Account를 생성하므로, Blockon계정만 사용할수 잇도록 하면좋을듯)
     */
    function athorizeAsAgent() public {
        // account 중개인 인증
        isAgent = true;

        //DB 업데이트도 해줘야 할지??
    }
}