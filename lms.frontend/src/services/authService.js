// src/services/authService.js
import apiClient from "./apiClient";

export const login = async (credentials) => {
  const { data } = await apiClient.post("/auth/login", credentials);
  // backend returns token string
  localStorage.setItem("token", data);
  return data; // return token directly
};

export const register = async (userData) => {
  const { data } = await apiClient.post("/auth/signup", userData);
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
