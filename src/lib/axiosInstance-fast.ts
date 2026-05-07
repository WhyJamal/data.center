import axios from "axios";

const apiFast = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiFast.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

apiFast.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("FAST API ERROR:", {
      url: error?.config?.url,
      status: error?.response?.status,
      message: error?.message,
      data: error?.response?.data,
    });

    return Promise.reject(error);
  }
);

export default apiFast;