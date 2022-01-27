import * as companyTypes from "../types/company.js";

const initialState = {
  companyInfo: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case companyTypes.SET_COMPANY_INFO:
      return { ...state, companyInfo: action.data };
    default:
      return state;
  }
};
export default adminReducer;
