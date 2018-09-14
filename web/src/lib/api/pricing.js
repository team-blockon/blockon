import hyconClient from 'lib/hyconClient';

export const sendTx = ({ privateKey, from, amount }) => {
  return hyconClient.post('/api/v1/signedtx', {
    privateKey,
    from,
    to: 'H3Ddx8bGSi1b1miq5y34RS3Azraxx5RKC',
    amount,
    fee: '0.000000001'
  });
};

export const getTx = ({ txHash }) => {
  return hyconClient.get(`/api/v1/tx/${txHash}`);
};
