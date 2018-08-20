import defaultClient from 'lib/defaultClient';

export const register = ({
  ethAddress,
  accountAddress,
  thumbnail,
  username,
  email
}) => {
  return defaultClient.post('/api/auth/register', {
    ethAddress,
    accountAddress,
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
