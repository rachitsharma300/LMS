// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Invalid user data:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      console.log("✅ Login Successful:", response);

      const { token, role, email, username } = response;
      
      if (!token) {
        throw new Error("No token received");
      }

      // Process role
      let userRole = role;
      if (role?.includes('ROLE_')) {
        userRole = role.replace('ROLE_', '');
      }

      const userData = {
        token,
        role: userRole,
        email,
        username
      };

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      
      // Update state
      setUser(userData);

      // Redirect based on role
      setTimeout(() => {
        if (userRole === "ADMIN") {
          navigate("/admin/dashboard", { replace: true });
        } else if (userRole === "INSTRUCTOR") {
          navigate("/instructor/dashboard", { replace: true });
        } else if (userRole === "STUDENT") {
          navigate("/student/dashboard", { replace: true });
        }
      }, 100);

      return response;
    } catch (error) {
      console.error("❌ Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const register = async (data) => {
    return await authService.register(data);
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};