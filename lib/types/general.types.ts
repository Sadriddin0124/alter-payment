export interface IFilterType {
  [key: string]: string | number | boolean | null | undefined;
}

export interface PaginationResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface IError {
  response: { data: { errors: { non_field_errors: [string] } } };
}
