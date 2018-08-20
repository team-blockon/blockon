import defaultClient from 'lib/defaultClient';

export const register = ({ ethAddress, thumbnail, username, email }) => {
  return defaultClient.post('/api/auth/register', {
    ethAddress,
    thumbnail,
    username,
    email
  });
};

export const login = ethAddress => {
  return defaultClient.post('/api/auth/login', {
    ethAddress
  });
};

export const logout = () => {
  return defaultClient.post('/api/auth/logout');
};

export const updateAccountAddressByEthAddress = (
  accountAddress,
  ethAddress
) => {
  return defaultClient.put(`/api/auth/${ethAddress}`, {
    accountAddress
  });
};
