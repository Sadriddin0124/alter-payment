import { $api } from "../api/api";
import { IFilterType } from "../types/general.types";
import { IStudentPayments } from "../types/student.types";
import { getFilterUrl } from "../utils";

export const fetchStudents = async (id: number, filters: IFilterType) => {
    const params = getFilterUrl(filters);
    const response = await $api.get(`/students/year/${id}/?${params}`);
    return response.data;
};

export const fetchStudent = async (id: number, ) => {
    const response = await $api.get(`/students/${id}/`);
    return response.data;
};

// payment
export const fetchStudentPayment = async ( filters: IFilterType) => {
    const params = getFilterUrl(filters);
    const response = await $api.get(`/payment/?${params}`);
    return response.data;
};

export const updateStudentPayment = async ( data: IStudentPayments) => {
    const response = await $api.put(`/payment/${data.id}/`, data);
    return response.data;
};