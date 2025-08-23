import { PaginationResponse } from "./general.types";

export interface IStudentList {
    id: number;
    full_name: string;
    contract: number;
    phone_number: string;
    jshshir: string;
    total_paid: number;
    left: number;
}

export type IPaginatedStudent = PaginationResponse<IStudentList>;

export interface IStudentPaymentSplits {
    left: number;
    amount: string;
    payment_date: string;
}

export interface IStudentPayments {
    id: number
    installment_count: number
    installment_payments: IStudentPaymentSplits[]
    left: number
    contract: string
    split_count: string
}