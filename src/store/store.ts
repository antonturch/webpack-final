import { makeAutoObservable } from "mobx";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import { login, logout, registration } from "../services/api/authService";
import { fetchProduct, fetchProducts } from "../services/api/productsService";
import {
  IDecodedUser,
  IFullOrder,
  IProduct,
  IUser,
} from "../services/api/types";
import { API_URL } from "../http";
import {
  addOrder,
  fetchOrder,
  fetchOrders,
} from "../services/api/orderService";

export default class Store {
  user: IUser = {} as IUser;
  isAuth = false;
  products = [] as IProduct[];
  orders = [] as IFullOrder[];
  //todo: probably next 2 lines need to refactor, but now I haven't idea how
  productForBuy: IProduct | null = null;
  orderForPay: IFullOrder | null = null;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  setProductForBuy(product: IProduct | null) {
    this.productForBuy = product;
  }

  setOrderForPay(order: IFullOrder) {
    this.orderForPay = order;
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

  setOrders(orders: IFullOrder[]) {
    this.orders = orders;
  }

  async createOrder() {
    if (this.productForBuy) {
      const res = await addOrder(this.user.id, this.productForBuy.id);
      this.setOrderForPay(res.data);
    }
  }

  async getProducts() {
    try {
      const response = await fetchProducts();
      this.setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async getProduct(productId: string) {
    try {
      const response = await fetchProduct(productId);
      this.setProductForBuy(response.data);
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

  async getOrder(orderId: number) {
    try {
      const response = await fetchOrder(orderId);
      this.setOrderForPay(response.data);
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
