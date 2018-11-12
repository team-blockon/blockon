import defaultClient from 'lib/defaultClient';

export const getMessages = ({ contractId, sender, receiver }) => {
  return defaultClient.post('/api/chat', { contractId, sender, receiver });
};
