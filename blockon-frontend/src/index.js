import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/modules';
import { Provider } from 'react-redux';
import penderMiddleware from 'redux-pender';

import Root from './client/Root';
import * as serviceWorker from './serviceWorker';
// import 'antd/dist/antd.css';
import 'antd/lib/auto-complete/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/date-picker/style/css';
import 'antd/lib/radio/style/css';
import 'antd/lib/popover/style/css';
import 'antd/lib/tabs/style/css';
import 'antd/lib/upload/style/css';
import './index.scss';

// 리덕스 개발자 도구 적용
const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

const middlewares = [penderMiddleware()];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
); // 스토어 만들기

// Root 컴포넌트를 id가 root인 DOM에 렌더링
ReactDOM.render(
  // Provider: 리액트 프로젝트에 스토어 연동
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
