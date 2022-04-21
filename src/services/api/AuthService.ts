import { AxiosResponse } from "axios";
import { api } from "../../http";
import { authResponse, IOrder, IProduct } from "./types";

export const login = async (email: string, password: string) => {
  return api.post<authResponse>("/auth/sign-in", { email, password });
};

export const registration = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return api.post<authResponse>("/auth/sign-up", {
    firstName,
    lastName,
    email,
    password,
  });
};
export const logout = async () => {
  return api.post("/auth/sign-out");
};

export const fetchProducts = (): Promise<AxiosResponse<IProduct[]>> => {
  return api.get<IProduct[]>("/products");
};

export const fetchOrders = (
  userId: number
): Promise<AxiosResponse<IOrder[]>> => {
  return api.get<IOrder[]>(`/orders/${userId}`);
};
