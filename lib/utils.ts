import { IFilterType } from "./types/general.types";

export const formatCurrency = (val: number) =>
  val.toLocaleString() + " so’m";


export const getFilterUrl = (data: IFilterType) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value.toString());
    }
  });
  return params;
};