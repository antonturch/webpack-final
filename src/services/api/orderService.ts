import { AxiosResponse } from "axios";
import { IFullOrder } from "./types";
import { api } from "../../http";

export const fetchOrders = (
  userId: number
): Promise<AxiosResponse<IFullOrder[]>> => {
  return api.get<IFullOrder[]>(`/orders/${userId}`);
};
export const fetchOrder = (
  orderId: number
): Promise<AxiosResponse<IFullOrder>> => {
  return api.get<IFullOrder>(`/orders/${orderId}/payment`);
};

export const addOrder = (
  userId: number,
  productId: number
): Promise<AxiosResponse<IFullOrder>> => {
  return api.post<IFullOrder>(`/orders/${userId}`, { productId });
};
