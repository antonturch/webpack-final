import { IUser, IProduct, IOrder, IDecodedUser } from "../services/api/types";
import { makeAutoObservable } from "mobx";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import {
  fetchOrders,
  fetchProducts,
  login,
  logout,
  registration,
} from "../services/api/AuthService";
import { API_URL } from "../http";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  products = [] as IProduct[];
  orders = [] as IOrder[];
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  setError(error: string) {
    this.error = error;
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setProducts(products: IProduct[]) {
    this.products = products;
  }

  setOrders(orders: IOrder[]) {
    this.orders = orders;
  }

  getUser() {
    return this.user;
  }

  addOrder(productId: number) {
    const ordersString = localStorage.getItem("orderInfo");

    localStorage.setItem("orderInfo", `${ordersString}${productId.toString()}`);
  }

  async getProducts() {
    try {
      const response = await fetchProducts();
      this.setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async getOrders() {
    try {
      const response = await fetchOrders(this.user.id);
      this.setOrders(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      this.setError(e.response.data.error.detail);
    }
  }

  async registration(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    try {
      const response = await registration(firstName, lastName, email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const googleToken = Cookies.get("jwt");
      if (googleToken) {
        const userData: IDecodedUser = jwtDecode(googleToken as string);
        if (userData.data) {
          this.setAuth(true);
          this.setUser({
            id: userData.data.id,
            email: userData.data.email,
            firstName: userData.data.firstName,
            lastName: userData.data.lastName,
          });
        }
        return;
      }
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        if (response.data.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
          this.setAuth(true);
          this.setUser(response.data.user);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
