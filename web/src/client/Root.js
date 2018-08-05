import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'shared/App';

/**
 * BrowserRouter를 적용하는 앱 최상위 컴포넌트
 */
const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
