import { AxiosResponse } from "axios";
import { IProduct } from "./types";
import { api } from "../../http";

export const fetchProducts = (): Promise<AxiosResponse<IProduct[]>> => {
  return api.get<IProduct[]>("/products");
};

export const fetchProduct = (
  productId: string
): Promise<AxiosResponse<IProduct>> => {
  return api.get<IProduct>(`/products/${productId}`);
};
