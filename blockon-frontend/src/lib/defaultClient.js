import axios from 'axios';

const defaultClient = axios.create({
  withCredentials: true
});

export default defaultClient;
