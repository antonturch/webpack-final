import { api } from "../../http";
import { authResponse } from "./types";

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




