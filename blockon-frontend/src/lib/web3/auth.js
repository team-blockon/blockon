import { openNotification } from 'lib/utils';
import * as Web3User from 'lib/web3/user';

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
 * 중개인 인증
 */
export const authorizeAsAgent = async () => {
  const { blockon } = window;

  return new Promise(async (resolve, reject) => {
    const { accountAddress } = await Web3User.getAccountInfo();
    blockon.athorizeAsAgent.sendTransaction(accountAddress, (error, result) => {
      if (!error) {
        resolve({ result });
      } else {
        reject({ msg: error });
      }
    });
  });
};
