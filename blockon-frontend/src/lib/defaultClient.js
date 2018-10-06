import axios from 'axios';

const defaultClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? '/' : 'http://blockon.house',
  withCredentials: true
});

export default defaultClient;
