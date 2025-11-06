import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import UserManagement from '../pages/admin/UserManagement';
import CourseApproval from '../pages/admin/CourseApproval';
import AdminDashboard from "../pages/admin/Dashboard";
import InstructorDashboard from "../pages/instructor/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import CourseViewer from "../pages/student/CourseViewer";

// ✅ ADD MISSING STUDENT PAGES
import CourseCatalog from "../pages/student/CourseCatalog";
import MyLearning from "../pages/student/MyLearning";

// ✅ INSTRUCTOR COMPONENTS IMPORT
import CreateCourse from "../pages/instructor/CreateCourse";
import CourseDetail from "../pages/instructor/CourseDetail";
import AddLesson from "../pages/instructor/AddLesson";
import EnrolledStudents from "../pages/instructor/EnrolledStudents";
import MediaUpload from "../pages/instructor/MediaUpload";

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
      <Route path="/" element={<Home />} />

      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
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

      {/* INSTRUCTOR ROUTES */}
      <Route
        path="/instructor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/courses/new"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <CreateCourse />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/courses/:id"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <CourseDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/courses/:id/lessons/new"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <AddLesson />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/courses/:id/students"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <EnrolledStudents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/instructor/lessons/:lessonId/edit"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <AddLesson /> {/* Ya phir EditLesson component banao */}
          </ProtectedRoute>
        }
      />

      <Route
        path="/instructor/courses/:id/media"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <MediaUpload />
          </ProtectedRoute>
        }
      />

      {/* STUDENT ROUTES - UPDATED WITH NEW PAGES */}
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
      
      {/* 🎯 ADD THESE NEW STUDENT ROUTES */}
      <Route
        path="/courses"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <CourseCatalog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/learning"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <MyLearning />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/enrollments"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard /> {/* Ya phir dedicated enrollments page banao */}
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/progress"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <MyLearning /> {/* Progress tracking MyLearning mein hi hai */}
          </ProtectedRoute>
        }
      />

      {/* DEFAULT ROUTE */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}