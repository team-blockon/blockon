import { combineReducers } from 'redux';
import user from './user';

// 루트 리듀서로 합쳐서 내보냄
export default combineReducers({
  user
});
