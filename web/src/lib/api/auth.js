import defaultClient from 'lib/defaultClient';

export const register = ({ username, email, password, isJunggae }) => {
  return defaultClient.post('/api/auth/register', {
    username,
    email,
    password,
    isJunggae
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
