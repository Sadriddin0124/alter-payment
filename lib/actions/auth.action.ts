import { $apiAuth } from "../api/api";
import { ILogin, IRegister } from "../types/auth.types";

export const login = async (data: ILogin) => {
  const response = await $apiAuth.post(`/student/login/`, data);
  return response.data;
};

export const register = async (data: IRegister) => {
  const response = await $apiAuth.post(`/student/register/`, data);
  return response.data;
};

export const fetchMe = async () => {
  const response = await $apiAuth.get(`/student/me/`);
  return response.data;
};
