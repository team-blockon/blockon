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
  return defaultClient.post('/api/user', {
    klaytnAddress
  });
};

export const getAccountByEamil = email => {
  return defaultClient.post('/api/user', {
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
