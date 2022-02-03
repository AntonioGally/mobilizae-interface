import * as companyTypes from "../types/company.js";

export const setCompanyInfo = (data) => {
  return {
    type: companyTypes.SET_COMPANY_INFO,
    data: data,
  };
};
