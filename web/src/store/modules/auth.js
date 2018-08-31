import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';

// 액션 타입
const SET_ERROR = 'auth/SET_ERROR';
const REGISTER = 'auth/REGISTER';
const LOGIN = 'auth/LOGIN';

const initialState = {
  error: null
};

// 액션 생성함수
export const register = createAction(REGISTER, AuthAPI.register);
export const login = createAction(LOGIN, AuthAPI.login);

const reducer = handleActions(
  {
    [SET_ERROR]: (state, { payload: error }) => {
      return produce(state, draft => {
        draft.error = error;
      });
    }
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: REGISTER,
    onError: (state, action) => {
      return produce(state, draft => {
        const { response } = action.payload;
        if (!response || !response.data || !response.data.msg) {
          draft.error = '알 수 없는 에러 발생';
          return;
        }
        draft.error = response.data.msg;
      });
    }
  },
  {
    type: LOGIN,
    onError: (state, action) => {
      return produce(state, draft => {
        const { response } = action.payload;
        if (!response || !response.data || !response.data.msg) {
          draft.error = '알 수 없는 에러 발생';
          return;
        }
        draft.error = response.data.msg;
      });
    }
  }
]);
