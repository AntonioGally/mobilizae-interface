import axios from "axios";
import SERVER from "./config";

const instance = axios.create({
  baseURL: SERVER.host,
});


instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      if (typeof window.appWebView !== "undefined") {
        window.appWebView.requestStatus(403);
      }
      if (error.response.data?.error_description) {
        window.logoutErrorCause = error.response.data.error_description;
      }
      localStorage.removeItem("access_token");
      document.location.reload();
    }
    return Promise.reject(error);
  }
);


export default instance;
