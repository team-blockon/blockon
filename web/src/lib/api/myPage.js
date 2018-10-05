import defaultClient from 'lib/defaultClient';
import hyconClient from 'lib/hyconClient';

export const getWallet = ({ ethAddress }) => {
  return defaultClient.get(`/api/mypage/wallet/${ethAddress}`);
};

export const getBalance = ({ hyconAddress }) => {
  return hyconClient.get(`/api/v1/wallet/${hyconAddress}/balance`);
};
