import axios from 'axios';

const hyconClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:2442'
      : 'http://blockon.house:2442'
});

export default hyconClient;
