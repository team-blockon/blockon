import axios from 'axios';

export const register = ({ username, email, password, isJunggae }) => {
  return axios.post('http://localhost:8000/api/auth/register', {
    username,
    email,
    password,
    isJunggae
  });
};

export const login = ({ email, password }) => {
  return axios.post('http://localhost:8000/api/auth/login', {
    email,
    password
  }, { withCredentials: true });
};

export const logout = () => {
  return axios.post('http://localhost:8000/api/auth/logout');
};
