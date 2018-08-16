import defaultClient from 'lib/defaultClient';

export const contactus = ({ name, email, phone, feedback }) => {
  return defaultClient.post('/api/qna', {
    name,
    email,
    phone,
    feedback
  });
};
