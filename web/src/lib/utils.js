import { notification } from 'antd';

export const openNotification = message => {
  notification['warning']({
    message
  });
};
