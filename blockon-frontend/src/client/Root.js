import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'shared/App';

import { LocaleProvider } from 'antd';
import ko_KR from 'antd/lib/locale-provider/ko_KR';
import 'moment/locale/ko';

/**
 * BrowserRouter를 적용하는 앱 최상위 컴포넌트
 */
const Root = () => (
  <BrowserRouter>
    <LocaleProvider locale={ko_KR}>
      <App />
    </LocaleProvider>
  </BrowserRouter>
);

export default Root;
