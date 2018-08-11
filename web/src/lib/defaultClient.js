import axios from 'axios';

const defaultClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '/',
  withCredentials: true
});

export default defaultClient;
