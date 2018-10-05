import { openNotification } from '../utils';

export const check = () => {
  let msg = [];

  if (!window.web3 || !window.web3.currentProvider.isMetaMask) {
    msg.push('메타마스크 설치 안됨. ');
    msg.push('구글 크롬 브라우저 확장 프로그램에서 Metamask를 설치해주세요');
  } else if (window.web3.eth.accounts.length === 0) {
    msg.push('메타마스크 로그인 안됨');
  } /* else if (window.web3.version.network !== '1') {
    msg = '메인넷 아님';
  } */ else {
    return true;
  }

  msg.forEach(msg => {
    openNotification(msg);
  });
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
