import axios from "axios";

export const register = ({ email, password }) => {
  return axios.post("http://localhost:8000/api/auth/register", {
    email,
    password
  });
};
export const login = ({ email, password }) => {
  return axios.post("http://localhost:8000/api/auth/login", {
    email,
    password
  });
};
