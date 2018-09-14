import defaultClient from 'lib/defaultClient';
import hyconClient from 'lib/hyconClient';

export const makeWallet = () => {
  return hyconClient.post('/api/v1/wallet');
};

export const saveWallet = ({ ethAddress, hyconAddress, hyconPrivateKey }) => {
  return defaultClient.post('/api/mypage/wallet', {
    ethAddress,
    hyconAddress,
    hyconPrivateKey
  });
};

export const getWallet = ({ ethAddress }) => {
  return defaultClient.get(`/api/mypage/wallet/${ethAddress}`);
};

export const getBalance = ({ hyconAddress }) => {
  return hyconClient.get(`/api/v1/wallet/${hyconAddress}/balance`);
};
