import { PaginationResponse } from "./general.types";

export interface IStudentList {
    id: number;
    full_name: string;
    contract: number;
    phone_number: string;
    jshshir: string;
}

export type IPaginatedStudent = PaginationResponse<IStudentList>;