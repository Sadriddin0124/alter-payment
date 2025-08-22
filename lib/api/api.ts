import axios, { CreateAxiosDefaults } from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const options: CreateAxiosDefaults = {
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
};

const $api = axios.create(options);
const $apiAuth = axios.create({ baseURL: API_URL });

// Request interceptor
$api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("accessToken");
  if (config.headers && access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers["ngrok-skip-browser-warning"] = "true";
  }
  return config;
});

// Response interceptor
$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await $apiAuth.post(`/api/bot/refresh`, {
          refresh: refreshToken,
        });

        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
        return $api(originalRequest);
      } catch (refreshErr) {
        console.error("Token refresh failed", refreshErr);
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export { $api, $apiAuth };
