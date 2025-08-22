import { $api } from "../api/api";
import { IEduYears } from "../types/edu-year.types";
import { IFilterType } from "../types/general.types";
import { getFilterUrl } from "../utils";

export const fetchEduYears = async (filters: IFilterType) => {
  const params = getFilterUrl(filters);
  const response = await $api.get(`/education-year/?${params}`);
  return response.data;
};

export const createEduYears = async (data: IEduYears) => {
  const response = await $api.post(`/education-year/`, data);
  return response.data;
};

export const updateEduYears = async (data: IEduYears) => {
  const response = await $api.put(`/education-year/`, data);
  return response.data;
};

export const deleteEduYears = async (id: number) => {
  const response = await $api.delete(`/education-year/${id}/`);
  return response.data;
};
