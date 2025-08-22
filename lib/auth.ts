import { $api } from "./api/api";

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true; // fallback: treat as expired
  }
};

export const refreshTokens = async (refreshToken: string) => {
  try {
    const response = await $api.post("/user/refresh/", {
      refresh: refreshToken,
    });
    const { access, refresh } = response.data;

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    return access;
  } catch (error) {
    console.error("Refresh failed", error);
    return null;
  }
};
