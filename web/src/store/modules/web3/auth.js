import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender';
import * as Web3Auth from 'lib/web3/auth';
import * as Web3Watch from 'lib/web3/watch';

// 액션 타입
const REGISTER = 'web3/auth/REGISTER';
const REGISTER_EVENT = 'web3/auth/REGISTER_EVENT';

const initialState = {
  error: null,
  ethAddress: null,
  accountAddress: null
};

// 액션 생성함수
export const register = createAction(REGISTER, Web3Auth.createAccount);
export const registerEvent = createAction(
  REGISTER_EVENT,
  Web3Watch.createAccount
);

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
  },
  {
    type: REGISTER_EVENT,
    onSuccess: (state, action) => {
      const { accountAddress, publicAddress } = action.payload;
      return {
        ...state,
        ethAddress: publicAddress,
        accountAddress
      };
    },
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
