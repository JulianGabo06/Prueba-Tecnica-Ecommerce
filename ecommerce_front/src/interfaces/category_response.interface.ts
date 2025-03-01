import { BasicIResponse } from "./user_response.interface";

export interface ICategory {
  id: number;
  name: string;
  createdAt?: Date;
  status: boolean;
}

export interface IGetCategoriesResponse extends BasicIResponse {
  data: ICategory[];
}

export interface CategoryOptions {
  value: number;
  label: string;
}
