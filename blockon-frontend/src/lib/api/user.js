import defaultClient from 'lib/defaultClient';

export const updateAccountAddressByEthAddress = (
  accountAddress,
  ethAddress
) => {
  return defaultClient.put(`/api/user/${ethAddress}`, {
    accountAddress
  });
};

export const getEmailList = value => {
  return defaultClient.post('/api/user/email', {
    value
  });
};

export const getAccountAddressByEthAddress = ethAddress => {
  return defaultClient.post('/api/user', {
    ethAddress
  });
};

export const getAccountAddressByEamil = email => {
  return defaultClient.post('/api/user', {
    email
  });
};
