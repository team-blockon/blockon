import defaultClient from 'lib/defaultClient';

export const sendAuthEmail = ({ email }) => {
  return defaultClient.post('/api/auth/sendAuthEmail', { email });
};

export const register = ({ profileFilename, email, password, username }) => {
  return defaultClient.post('/api/auth/register', {
    profileFilename,
    email,
    password,
    username
  });
};

export const login = ({ email, password }) => {
  return defaultClient.post('/api/auth/login', {
    email,
    password
  });
};

export const logout = () => {
  return defaultClient.post('/api/auth/logout');
};
