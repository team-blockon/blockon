import { openNotification } from '../utils/common';

export const check = () => {
  let msg = null;
  let desc = null;

  if (!window.web3 || !window.web3.currentProvider.isMetaMask) {
    msg = '메타마스크 설치 필요';
    desc = 'Chrome 웹 스토어에서 메타마스크를 설치해 주세요.';
  } else if (window.web3.eth.accounts.length === 0) {
    msg = '메타마스크 로그인 필요';
  } /* else if (window.web3.version.network !== '1') {
    msg = '메인넷 연결 필요';
  } */ else {
    return true;
  }

  openNotification(msg, desc);
  return false;
};

/**
 * default account를 비동기로 가져옴
 */
export const getDefaultAccount = () => {
  return new Promise((resolve, reject) => {
    window.web3.eth.getAccounts((err, accounts) => {
      if (!err) {
        resolve(accounts[0]);
      } else {
        reject(err);
      }
    });
  });
};

/**
 * 가장 최신 블록넘버를 반환
 */
export const getLatestBlockNumber = () => {
  return new Promise((resolve, reject) => {
    window.web3.eth.getBlockNumber((err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};
