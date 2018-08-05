import axios from 'axios';

export const register = ({ username, email, password }) => {
  return axios.post('http://localhost:8000/api/auth/register', {
    username,
    email,
    password
  });
};

export const login = ({ email, password }) => {
  return axios.post('http://localhost:8000/api/auth/login', {
    email,
    password
  });
};

export const logout = () => {
  return axios.post('http://localhost:8000/api/auth/logout');
};
