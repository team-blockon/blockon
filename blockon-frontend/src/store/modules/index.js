import { combineReducers } from 'redux';
import user from './user';
import loading from './loading';
import caverAuth from './caver/auth';
import caverContract from './caver/contract';
import { penderReducer } from 'redux-pender';

// 루트 리듀서로 합쳐서 내보냄
export default combineReducers({
  user,
  loading,
  caverAuth,
  caverContract,
  pender: penderReducer
});
