import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender';
import * as CaverContract from 'lib/caver/contract';
import * as CaverWatch from 'lib/caver/watch';

// 액션 타입
const CHANGE_STATE = 'caver/contract/CHANGE_STATE';
const UPDATE_EVENT = 'caver/contract/UPDATE_EVENT';

const initialState = {
  error: null,
  updateType: null,
  contractIndex: null
};

// 액션 생성함수
export const changeState = createAction(
  CHANGE_STATE,
  CaverContract.confirmToChangeContractStateAt
);
export const updateEvent = createAction(
  UPDATE_EVENT,
  CaverWatch.updateContract
);

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
