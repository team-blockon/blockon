import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import rootReducer from './store/modules';
import { Provider } from 'react-redux';

import Root from './client/Root';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

// 리덕스 개발자 도구 적용
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools); // 스토어 만들기

// Root 컴포넌트를 id가 root인 DOM에 렌더링
ReactDOM.render(
  // Provider: 리액트 프로젝트에 스토어 연동
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
