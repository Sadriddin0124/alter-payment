import { $api } from "../api/api";
import { IFilterType } from "../types/general.types";
import { getFilterUrl } from "../utils";

export const fetchStudents = async (id: number, filters: IFilterType) => {
    const params = getFilterUrl(filters);
    const response = await $api.get(`/students/year/${id}/?${params}`);
    return response.data;
};