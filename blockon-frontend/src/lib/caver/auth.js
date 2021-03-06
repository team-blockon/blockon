import { openNotification } from 'lib/utils/common';

/**
 * Account 생성
 * @param {*} ethAddress
 */
export const createAccount = ethAddress => {
  return new Promise((resolve, reject) => {
    const { blockon } = window;

    try {
      // Blockon 계약 내의 createAccount 함수 호출
      blockon.createAccount.sendTransaction(ethAddress, (error, txHash) => {
        if (!error) {
          resolve({ txHash });
        } else {
          reject({ msg: error });
        }
      });
    } catch (e) {
      if (e.message === 'invalid address') {
        openNotification('잠시 후 다시 시도해 주세요.');
      }
    }
  });
};

/**
 * 중개인 여부
 * @param {*} accountInstance
 */
export const isAgent = accountInstance => {
  return accountInstance.methods.isAgent().call();
};
