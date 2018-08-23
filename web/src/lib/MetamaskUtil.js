import { notification } from 'antd';

const openNotification = message => {
  notification['warning']({
    message
  });
};

export const check = () => {
  let msg = null;

  if (!window.web3.currentProvider.isMetaMask) {
    msg = '메타마스크 설치 안됨';
  } else if (window.web3.eth.accounts.length === 0) {
    msg = '메타마스크 로그인 안됨';
  } /* else if (window.web3.version.network !== '1') {
    msg = '메인넷 아님';
  } */ else {
    return true;
  }

  openNotification(msg);
  return false;
};

export const getDefaultAccount = () => {
  return window.web3.eth.accounts[0];
};
