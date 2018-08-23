import defaultClient from 'lib/defaultClient';

export const create = contract => {
  return defaultClient.post('/api/contract', contract);
};
