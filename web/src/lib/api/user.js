import defaultClient from 'lib/defaultClient';

export const updateAccountAddressByEthAddress = (
  accountAddress,
  ethAddress
) => {
  return defaultClient.put(`/api/user/${ethAddress}`, {
    accountAddress
  });
};

export const getEmailList = () => {
  return defaultClient.post('/api/user/email');
};
