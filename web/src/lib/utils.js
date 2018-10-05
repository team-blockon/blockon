import { notification } from 'antd';

export const openNotification = (message, description) => {
  notification['warning']({
    message,
    description
  });
};
