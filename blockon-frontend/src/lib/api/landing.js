import defaultClient from 'lib/defaultClient';

export const subscribe = email => {
  return defaultClient.post('/api/landing/subscribe', {
    email
  });
};

export const contactus = ({ name, email, phone, feedback }) => {
  return defaultClient.post('/api/qna', {
    name,
    email,
    phone,
    feedback
  });
};
