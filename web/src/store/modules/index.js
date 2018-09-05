import { combineReducers } from 'redux';
import user from './user';
import web3Auth from './web3/auth';
import web3Contract from './web3/contract';
import { penderReducer } from 'redux-pender';

// 루트 리듀서로 합쳐서 내보냄
export default combineReducers({
  user,
  web3Auth,
  web3Contract,
  pender: penderReducer
});
