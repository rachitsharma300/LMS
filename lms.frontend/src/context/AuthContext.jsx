// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import * as authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Load user from token (if already logged in)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  // ✅ Login function
  const login = async (credentials) => {
    try {
      const { token } = await authService.login(credentials);
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded);

      const roles = Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles];
      if (roles.includes("ADMIN")) navigate("/admin/dashboard");
      else if (roles.includes("INSTRUCTOR")) navigate("/instructor/dashboard");
      else navigate("/student/dashboard");
    } catch (err) {
      throw err;
    }
  };

  // ✅ Register
  const register = async (data) => {
    return await authService.register(data);
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
