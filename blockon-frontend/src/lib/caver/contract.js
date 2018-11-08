import caver from 'lib/caver';
import * as CaverUtils from 'lib/caver/utils';
import { getDefaultAccount } from './utils';

/**
 * 계약 생성
 * @param {*} agentAddress 중개인 Account 컨트랙트 주소
 * @param {*} sellerAddress 매도인 Account 컨트랙트 주소
 * @param {*} buyerAddress 매수인 Account 컨트랙트 주소
 * @param {*} contractType 월세인지, 전세인지, 매매인지
 */
export const create = (
  agentAddress,
  sellerAddress,
  buyerAddress,
  contractType
) => {
  const { blockon } = window;
  console.log(agentAddress, sellerAddress, buyerAddress, contractType);

  return new Promise((resolve, reject) => {
    CaverUtils.sendTransaction(
      blockon,
      'createContract',
      agentAddress,
      sellerAddress,
      buyerAddress,
      contractType
    );
    // blockon.methods.createContract().sendTransaction(
    //   /* 먼저 createAccount를 호출하고, 생성된 Account 컨트랙트의 주소를 넣음 */

    //   (error, result) => {
    //     if (!error) {
    //       resolve(result);
    //     } else {
    //       reject(error);
    //     }
    //   }
    // );
  });
};

/**
 * Account 컨트랙트에 저장된 특정 인덱스의 계약상태를 변경하는것에 동의함
 * 모든 구성원이 동의한것이 아니면 상태 변환이 일어나지 않음
 * @param {*} accountInstance 대상 Account 인스턴스
 * @param {*} contractIndex 상태를 변경할 계약 인덱스
 * @param {*} newContractState 새로운 상태
 */
export const confirmToChangeContractStateAt = ({
  accountInstance,
  contractIndex,
  newContractState
}) => {
  return new Promise((resolve, reject) => {
    accountInstance.confirmToChangeContractStateAt.sendTransaction(
      contractIndex,
      newContractState,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject({ msg: error });
        }
      }
    );
  });
};

/**
 * Account 컨트랙트에 저장된 특정 인덱스의 계약상태변경에 동의했던것을 취소함
 * 이미 상태변경이 완료된경우에는 취소가 되지 않는다
 * @param {*} accountInstance 대상 Account 인스턴스
 * @param {*} contractIndex 상태를 변경할 계약 인덱스
 * @param {*} contractStateToRevoke 새로운 상태
 */
export const revokeConfirmationAt = ({
  accountInstance,
  contractIndex,
  contractStateToRevoke
}) => {
  // 상태 변경이 취소될때 어떻게 받을것인지???
  return new Promise((resolve, reject) => {
    accountInstance.revokeConfirmationAt.sendTransaction(
      contractIndex,
      contractStateToRevoke,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject({ msg: error });
        }
      }
    );
  });
};

/**
 * 특정 Account 컨트랙트에 저장된 계약길이 반환
 * @param {*} accountInstance 대상 Account 인스턴스
 */
export const getContractsLength = accountInstance => {
  return new Promise(async (resolve, reject) => {
    /**
     * 에러: Couldn't decode uint256 from ABI: 0x
     */
    caver.klay
      .call({
        to: accountInstance._address,
        data: accountInstance.methods.getContractsLength().encodeABI()
      })
      .then(console.log);

    // const length = await accountInstance.methods.getContractsLength().call({
    //   from: getDefaultAccount(),
    //   gas: '200000'
    // });

    // console.log(length);
    // CaverUtils.sendTransaction(accountInstance, 'getContractsLength');
  });
};

/**
 * Account 컨트랙트에 저장된 특정 인덱스의 계약정보(계약종류, 계약상태) 반환
 * @param {*} accountInstance 대상 Account 인스턴스
 * @param {*} contractIndex 조회할 계약의 인덱스
 */
export const getContractInfoAt = (accountInstance, contractIndex) => {
  return new Promise((resolve, reject) => {
    accountInstance.getContractInfoAt(contractIndex, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

/**
 * Account 컨트랙트에 저장된 특정 인덱스의 계약에대해, 계약 상태 변경 동의 여부를 반환
 * @param {*} accountInstance 대상 Account 인스턴스
 * @param {*} contractIndex 조회할 계약의 인덱스
 * @param {*} contractState 조회할 컨트랙트 상태
 * @return [bool isAgentConfirmed, bool isSellerConfirmed, bool isBuyerConfirmed]
 */
export const hasConfirmed = (accountInstance, contractIndex, contractState) => {
  return new Promise((resolve, reject) => {
    accountInstance.hasConfirmed(
      contractIndex,
      contractState,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

/**
 * Account 컨트랙트에 저장된 특정 인덱스의 계약에대해, 계약 상태 변경 여부를 반환
 * @param {*} accountInstance 대상 Account 인스턴스
 * @param {*} contractIndex 조회할 계약의 인덱스
 * @param {*} contractState 조회할 컨트랙트 상태
 */
export const hasExecuted = (accountInstance, contractIndex, contractState) => {
  return new Promise((resolve, reject) => {
    accountInstance.hasExecuted(
      contractIndex,
      contractState,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};
