import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender';
import * as Web3Contract from 'lib/web3/contract';
import * as Web3Watch from 'lib/web3/watch';

// 액션 타입
const CHANGE_STATE = 'web3/contract/CHANGE_STATE';
const UPDATE_EVENT = 'web3/contract/UPDATE_EVENT';

const initialState = {
  error: null,
  updateType: null,
  contractIndex: null
};

// 액션 생성함수
export const changeState = createAction(
  CHANGE_STATE,
  Web3Contract.changeContractStateAt
);
export const updateEvent = createAction(UPDATE_EVENT, Web3Watch.updateContract);

const reducer = handleActions({}, initialState);

export default applyPenders(reducer, [
  {
    type: CHANGE_STATE,
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
    type: UPDATE_EVENT,
    onSuccess: (state, action) => {
      const { updateType, contractIndex } = action.payload;
      return {
        ...state,
        updateType,
        contractIndex
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
