// src/App.js - UPDATED WITH SMART LAYOUT
import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Layout component with conditional Navbar/Footer
function AppLayout() {
  const location = useLocation();
  
  // Define routes where Navbar & Footer should NOT show
  const hideLayoutRoutes = [
    '/admin/dashboard',
    '/admin/users', 
    '/admin/courses',
    '/instructor/dashboard',
    '/instructor/courses',
    '/instructor/lessons',
    '/instructor/media',
    '/student/dashboard',
    '/student/learning',
    '/student/enrollments',
    '/student/progress',
    '/student/course'
  ];

  const shouldShowLayout = !hideLayoutRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Conditionally render Navbar */}
      {shouldShowLayout && <Navbar />}
      
      {/* Main Content */}
      <main className={shouldShowLayout ? "flex-grow" : "min-h-screen"}>
        <AppRoutes />
      </main>
      
      {/* Conditionally render Footer */}
      {shouldShowLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}