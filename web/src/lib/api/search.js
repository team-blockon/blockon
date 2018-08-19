import defaultClient from 'lib/defaultClient';

export const search = () => {
  return defaultClient.post('/api/agent/search');
};
