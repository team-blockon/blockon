import defaultClient from 'lib/defaultClient';

export const sendAuthEmail = ({ email }) => {
  return defaultClient.post('/api/auth/sendAuthEmail', { email });
};

export const register = ({
  klaytnAddress,
  profileFilename,
  username,
  email
}) => {
  return defaultClient.post('/api/auth/register', {
    klaytnAddress,
    profileFilename,
    username,
    email
  });
};

export const login = klaytnAddress => {
  return defaultClient.post('/api/auth/login', {
    klaytnAddress
  });
};

export const logout = () => {
  return defaultClient.post('/api/auth/logout');
};
