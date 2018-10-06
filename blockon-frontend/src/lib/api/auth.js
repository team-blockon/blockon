import defaultClient from 'lib/defaultClient';

export const sendAuthEmail = ({ email }) => {
  return defaultClient.post('/api/auth/sendAuthEmail', { email });
};

export const register = ({ ethAddress, profileFilename, username, email }) => {
  return defaultClient.post('/api/auth/register', {
    ethAddress,
    profileFilename,
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
