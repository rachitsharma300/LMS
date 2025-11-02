// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  const roleLinks = () => {
    if (!user?.roles) return null;
    const roles = Array.isArray(user.roles) ? user.roles : [user.roles];
    return (
      <>
        {roles.includes("ADMIN") && (
          <Link to="/admin/dashboard" className="px-3 py-1 rounded hover:bg-gray-100">
            Admin
          </Link>
        )}
        {roles.includes("INSTRUCTOR") && (
          <Link to="/instructor/dashboard" className="px-3 py-1 rounded hover:bg-gray-100">
            Instructor
          </Link>
        )}
        {roles.includes("STUDENT") && (
          <Link to="/student/dashboard" className="px-3 py-1 rounded hover:bg-gray-100">
            Student
          </Link>
        )}
      </>
    );
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
              <span className="font-semibold text-lg">ByteLMS</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 ml-6 text-sm text-gray-600">
              <Link to="/" className="px-2 py-1 rounded hover:bg-gray-100">Home</Link>
              <Link to="/courses" className="px-2 py-1 rounded hover:bg-gray-100">Courses</Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm">{roleLinks()}</div>

            {user ? (
              <>
                <div className="hidden md:block text-sm text-gray-700">
                  Hi, <span className="font-medium">{user.name || user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1 border rounded text-sm hover:bg-gray-50">Login</Link>
                <Link to="/signup" className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
