import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const STOP_LOADING = 'loading/STOP_LOADING';

export const startLoading = createAction(START_LOADING);
export const stopLoading = createAction(STOP_LOADING);

const initialState = {
  isLoading: false
};

export default handleActions(
  {
    [START_LOADING]: (state, action) => ({
      isLoading: true
    }),
    [STOP_LOADING]: (state, action) => ({
      isLoading: false
    })
  },
  initialState
);
