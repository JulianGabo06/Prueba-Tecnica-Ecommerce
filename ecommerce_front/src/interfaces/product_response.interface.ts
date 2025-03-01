import { BasicIResponse } from "./user_response.interface";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  createdAt?: string;
  status: boolean;
  categories: IProductCategory[];
}

export interface IProductCategory {
  id: number;
  name: string;
}

export interface IGetProductsResponse extends BasicIResponse {
  data: IProduct[];
}

export interface ICrateProductResponse extends BasicIResponse {
    data: IProduct;
}

export interface IProductForm
  extends Omit<
    IProduct,
    "id" | "createdAt" | "categories" | "status" | "images"
  > {
  categories: number[];
  image: undefined | { file: string; url: string; name: string };
}
