import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_PREFIX;
const USERNAME = process.env.NEXT_PUBLIC_API_USER;
const PASSWORD = process.env.NEXT_PUBLIC_API_PASS;

/**
 * Basic Auth encode (UTF-8 safe)
 */
const createBasicToken = () => {
  if (!USERNAME || !PASSWORD) return "";

  if (typeof window === "undefined") {
    // SSR (Node.js)
    return Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64");
  }

  // Browser
  return btoa(
    unescape(encodeURIComponent(`${USERNAME}:${PASSWORD}`))
  );
};

const api = axios.create({
  baseURL: `/${API_BASE}/`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = createBasicToken();

    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error?.response || error);

    if (error.response?.status === 401) {
      console.error("1C Authorization error");
    }

    if (error.response?.status === 500) {
      console.error("1C Server error");
    }

    return Promise.reject(error);
  }
);

export default api;