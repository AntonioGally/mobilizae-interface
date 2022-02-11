import * as adminTypes from "../types/admin.js";

const initialState = {
  pageList: null,
  userList: null,
  adminInfo: null,
  filters: null,
  adminList: null,
  selectedAdmin: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.SET_PAGE_LIST:
      return { ...state, pageList: action.data };
    case adminTypes.SET_USER_LIST:
      return { ...state, userList: action.data };
    case adminTypes.SET_ADMIN_INFO:
      return { ...state, adminInfo: action.data };
    case adminTypes.SET_FILTERS:
      return { ...state, filters: action.data };
    case adminTypes.SET_ADMIN_LIST:
      return { ...state, adminList: action.data };
    case adminTypes.SET_SELECTED_ADMIN:
      return { ...state, selectedAdmin: action.data };
    default:
      return state;
  }
};
export default adminReducer;
