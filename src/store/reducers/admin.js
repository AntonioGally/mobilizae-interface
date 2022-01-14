import * as adminTypes from "../types/admin.js";

const initialState = {
  pageList: null,
  userList: null
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.SET_PAGE_LIST:
      return { ...state, pageList: action.data }
    case adminTypes.SET_USER_LIST:
      return { ...state, userList: action.data }
    default:
      return state
  }
}
export default adminReducer;