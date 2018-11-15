import defaultClient from 'lib/defaultClient';

export const updateAccountAddressByKlaytnAddress = (
  accountAddress,
  klaytnAddress
) => {
  return defaultClient.put(`/api/user/${klaytnAddress}/address`, {
    accountAddress
  });
};

export const getEmailList = value => {
  return defaultClient.post('/api/user/email', {
    value
  });
};

export const getAccountByKlaytnAddress = klaytnAddress => {
  return defaultClient.post('/api/user/find/klaytn', {
    klaytnAddress
  });
};

export const getAccountByEamil = email => {
  return defaultClient.post('/api/user/find/email', {
    email
  });
};

export const updateAccountByKlaytnAddress = ({
  klaytnAddress,
  profile,
  email
}) => {
  return defaultClient.put(`/api/user/${klaytnAddress}`, {
    profile,
    email
  });
};

export const getNamesByAccountAddress = ({
  agentAddress,
  buyerAddress,
  sellerAddress
}) => {
  return defaultClient.post('/api/user/names', {
    agentAddress,
    buyerAddress,
    sellerAddress
  });
};
