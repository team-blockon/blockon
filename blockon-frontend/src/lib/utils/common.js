import { notification } from 'antd';

export const openNotification = (message, description) => {
  notification['warning']({
    message,
    description
  });
};

export const getImageUrl = imagePath => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:8000/uploads/${imagePath}`;
  } else {
    return `uploads/${imagePath}`;
  }
};
