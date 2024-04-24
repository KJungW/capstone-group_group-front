// action type
export const UPDATE_LOGIN_DATA = "UPDATE_LOGIN_DATA"
export const UPDATE_BOARD_LIST_DATA = "UPDATE_BOARD_LIST_DATA"

// store 데이터 변경 메서드
export const updateLoginData = loginData => ({ type: UPDATE_LOGIN_DATA, loginData });
export const updateBoardListData = boardListData => ({ type: UPDATE_BOARD_LIST_DATA, boardListData });

const initalState = {
  loginData : undefined,
  boardListData : undefined
};

// reducer 정의
const mainReducerInStore = (state = initalState, action) => {
    switch (action.type) {
        case UPDATE_LOGIN_DATA:
          return {
            ...state,
            loginData: action.loginData
          };
          case UPDATE_BOARD_LIST_DATA:
            return {
              ...state,
              boardListData: action.boardListData
            };
        default:
          return state;
      }
};

export default mainReducerInStore;