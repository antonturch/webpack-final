export interface authResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  img: string;
}

export interface IOrder {
  id: number;
  userId: number;
  productId: number;
}

export interface IDecodedUser {
  data: IUser;
  exp: number;
  iat: number;
}
