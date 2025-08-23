import axios, { CreateAxiosDefaults, AxiosError, AxiosRequestConfig } from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ---- TS: allow _retry flag on requests ----
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

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

/* ---------------- helpers ---------------- */
const isBrowser = typeof window !== "undefined";
const LOGIN_PATH = "/login";
const REFRESH_URL = "/api/bot/refresh";

function goLogin() {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch {}
  if (isBrowser && window.location.pathname !== LOGIN_PATH) {
    window.location.href = LOGIN_PATH;
  }
}

/* Single-flight refresh */
let refreshPromise: Promise<string> | null = null;
async function refreshAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = isBrowser ? localStorage.getItem("refreshToken") : null;
    if (!refreshToken) throw new Error("NO_REFRESH_TOKEN");

    const { data } = await $apiAuth.post(REFRESH_URL, { refresh: refreshToken });

    // persist new tokens
    if (isBrowser) {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
    }
    return data.access as string;
  })();

  try {
    const token = await refreshPromise;
    return token;
  } finally {
    refreshPromise = null; // reset either way
  }
}

/* -------------- interceptors -------------- */
// Attach access token
$api.interceptors.request.use((config) => {
  const access_token = isBrowser ? localStorage.getItem("accessToken") : null;
  if (config.headers && access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers["ngrok-skip-browser-warning"] = "true";
  }
  return config;
});

// Handle 401/403 -> refresh or redirect
$api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // if the refresh call itself failed -> bail to login
    const isRefreshCall = originalRequest?.url?.includes(REFRESH_URL);

    // 401: try to refresh once
    if (status === 401 && !originalRequest?._retry && !isRefreshCall) {
      originalRequest._retry = true;
      try {
        const newAccess = await refreshAccessToken();
        // retry original with new token
        originalRequest.headers = {
          ...(originalRequest.headers || {}),
          Authorization: `Bearer ${newAccess}`,
          "ngrok-skip-browser-warning": "true",
        };
        return $api(originalRequest);
      } catch {
        goLogin();
        return Promise.reject(error);
      }
    }

    // 403 means forbidden/expired session on many backends -> go login
    if (status === 403 || isRefreshCall) {
      goLogin();
    }

    return Promise.reject(error);
  }
);

export { $api, $apiAuth };
