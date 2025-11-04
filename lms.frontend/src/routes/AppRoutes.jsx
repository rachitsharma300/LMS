import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import UserManagement from '../pages/admin/UserManagement';
import CourseApproval from '../pages/admin/CourseApproval';
import AdminDashboard from "../pages/admin/Dashboard";
import InstructorDashboard from "../pages/instructor/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import CourseViewer from "../pages/student/CourseViewer";

export default function AppRoutes() {
  console.log("✅ AppRoutes rendered");

  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("userRole")
  });

  // ✅ Listen for storage changes and custom events
  useEffect(() => {
    const handleStorageChange = () => {
      setAuth({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("userRole")
      });
    };

    const handleLoginEvent = () => {
      handleStorageChange();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("login", handleLoginEvent);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("login", handleLoginEvent);
    };
  }, []);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!auth.token) return <Navigate to="/login" replace />;
    
    // ✅ Get role from localStorage instead of decoding token
    const userRole = auth.role?.replace('ROLE_', '');
    
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/course/:id"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <CourseViewer />
          </ProtectedRoute>
        }
      />
      <Route
  path="/admin/users"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <UserManagement />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/courses"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <CourseApproval />
    </ProtectedRoute>
  }
/>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}