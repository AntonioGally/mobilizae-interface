import * as adminTypes from "../types/admin.js";

export const setPageList = (data) => {
  return {
    type: adminTypes.SET_PAGE_LIST,
    data: data,
  };
};

export const setUserList = (data) => {
  return {
    type: adminTypes.SET_USER_LIST,
    data: data,
  };
};

export const setAdminInfo = (data) => {
  return {
    type: adminTypes.SET_ADMIN_INFO,
    data: data,
  };
};
