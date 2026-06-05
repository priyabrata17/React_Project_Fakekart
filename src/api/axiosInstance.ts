import axios, { type AxiosInstance } from "axios";
import { baseURL } from "./endPoints";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    let token =
      localStorage.getItem("fakekartToken") ||
      sessionStorage.getItem("fakekartToken");
    console.log("token:", token);
    if (token) {
      config.headers["x-access-token"] = token;
    }
    console.log("INTERCEPTOR RUNNING...", config?.headers);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
