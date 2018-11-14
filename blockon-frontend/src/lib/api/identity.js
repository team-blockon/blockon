import axios from 'axios';
import defaultClient from 'lib/defaultClient';

export const ocr = ({ formData }) => {
  return axios({
    method: 'post',
    url: 'http://35.234.6.206/ocr',
    data: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  });
};

export const setAgent = ({ email }) => {
  return defaultClient.post('/api/identity/setAgent', { email });
};
