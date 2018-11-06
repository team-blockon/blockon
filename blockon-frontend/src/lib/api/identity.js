import axios from 'axios';

export const ocr = ({ formData }) => {
  return axios({
    method: 'post',
    url: 'http://35.234.6.206/ocr',
    data: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  });
};
