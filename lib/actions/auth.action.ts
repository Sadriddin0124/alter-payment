import { $apiAuth } from "../api/api";
import { ILogin } from "../types/auth.types";

export const login = async (data: ILogin) => {
  const response = await $apiAuth.post(`/user/login/`, data);

  return response.data;
};
