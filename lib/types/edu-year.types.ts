import { PaginationResponse } from "./general.types";

export interface IEduYears {
  edu_year: string;
  id: number;
}

export type IPaginatedEduYears = PaginationResponse<IEduYears>;