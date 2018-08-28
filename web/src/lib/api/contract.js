import defaultClient from 'lib/defaultClient';

export const create = contract => {
  return defaultClient.post('/api/contract', contract);
};

export const get = (accountAddress, index) => {
  return defaultClient.post(`/api/contract/${index}`, { accountAddress });
};
