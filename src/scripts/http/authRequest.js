import axios from "axios";
import SERVER from "./config";

const instance = axios.create({
  baseURL: SERVER.host,
});

instance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("access_token");
  accessToken && (request.headers["x-token"] = accessToken);
  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (typeof window.appWebView !== "undefined") {
        window.appWebView.requestStatus(401);
      }
      if (error.response.data?.error_description) {
        window.logoutErrorCause = error.response.data.error_description;
      }
      // When a request is not made from /logout, redirect to /login and clear all user data
    }
    return Promise.reject(error);
  }
);

export default instance;
