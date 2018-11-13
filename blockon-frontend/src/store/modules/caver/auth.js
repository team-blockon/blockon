import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender';
import * as CaverAuth from 'lib/caver/auth';

// 액션 타입
const REGISTER = 'caver/auth/REGISTER';

const initialState = {
  error: null,
  klaytnAddress: null,
  accountAddress: null
};

// 액션 생성함수
export const register = createAction(REGISTER, CaverAuth.createAccount);

const reducer = handleActions({}, initialState);

export default applyPenders(reducer, [
  {
    type: REGISTER,
    onError: (state, action) => {
      return produce(state, draft => {
        const { msg } = action.payload;
        if (!msg) {
          draft.error = '알 수 없는 에러 발생';
          return;
        }
        draft.error = msg;
      });
    }
  }
]);
