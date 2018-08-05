import { createAction, handleActions } from 'redux-actions';

// 액션 타입
const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO'; // 로그인 정보 설정
const LOGOUT = 'user/LOGOUT'; // 로그아웃

/**
 * 액션 생성함수
 *
 * createAction(
 *   액션 타입,
 *   payload 필드를 어떻게 설정할지 정함
 * )
 */
export const setLoggedInfo = createAction(SET_LOGGED_INFO);
export const logout = createAction(LOGOUT);

// 초기상태
const initialState = {
  loggedInfo: {
    // 로그인 유저 정보
    username: null,
    thumbnail: null
  },
  isLogged: false, // 로그인 중인지
  validated: false // 서버측 검증했는지
};

// 리듀서
export default handleActions(
  {
    [SET_LOGGED_INFO]: (state, action) => ({
      ...state,
      loggedInfo: { ...action.payload },
      isLogged: true
    }),
    [LOGOUT]: (state, action) => ({
      ...state,
      isLogged: false
    })
  },
  initialState
);
