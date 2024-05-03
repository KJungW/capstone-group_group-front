// action type
export const UPDATE_LOGIN_DATA = "UPDATE_LOGIN_DATA"
export const UPDATE_BOARD_LIST_DATA = "UPDATE_BOARD_LIST_DATA"
export const UPDATE_ACTIVE_LOGIN_MODAL = "UPDATE_ACTIVE_LOGIN_MODAL"
export const UPDATE_ACTIVE_SIGNUP_MODAL = "UPDATE_ACTIVE_SIGNUP_MODAL"
export const UPDATE_CURRENT_BOARD_ID = "UPDATE_CURRENT_BOARD_ID"

// store 데이터 변경 메서드
export const updateLoginData = loginData => ({ type: UPDATE_LOGIN_DATA, loginData });
export const updateBoardListData = boardListData => ({ type: UPDATE_BOARD_LIST_DATA, boardListData });
export const openLoginModal = () => ({ type: UPDATE_ACTIVE_LOGIN_MODAL, isActive:true });
export const closeLoginModal = () => ({ type: UPDATE_ACTIVE_LOGIN_MODAL, isActive:false });
export const openSignupModal = () => ({ type: UPDATE_ACTIVE_SIGNUP_MODAL, isActive:true });
export const closeSignupModal = () => ({ type: UPDATE_ACTIVE_SIGNUP_MODAL, isActive:false });
export const updateCurrentBoardId = boardId => ({ type: UPDATE_CURRENT_BOARD_ID, boardId })

const initalState = {
  loginData : undefined,
  boardListData : undefined,
  activeLoginModal : false,
  activeSignupModal : false,
  currentBoardId : undefined
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
          case UPDATE_ACTIVE_LOGIN_MODAL:
            return {
              ...state,
              activeLoginModal: action.isActive
            }
          case UPDATE_ACTIVE_SIGNUP_MODAL:
            return {
              ...state,
              activeSignupModal: action.isActive
            }
            case UPDATE_CURRENT_BOARD_ID:
              return {
                ...state,
                currentBoardId: action.boardId
              }
        default:
          return state;
      }
};

export default mainReducerInStore;