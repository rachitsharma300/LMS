// src/layouts/StudentLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

/**
 * StudentLayout
 * - Navbar on top
 * - Sidebar with student links (Courses, Enrollments, Progress)
 * - Primary content area for lessons, course viewer
 */
export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r hidden md:block">
          <div className="p-4 border-b">
            <h4 className="text-lg font-semibold">Student</h4>
          </div>

          <nav className="p-4 space-y-2 text-sm">
            <Link to="/student/dashboard" className="block px-3 py-2 rounded hover:bg-gray-50">Dashboard</Link>
            <Link to="/courses" className="block px-3 py-2 rounded hover:bg-gray-50">Browse Courses</Link>
            <Link to="/student/enrollments" className="block px-3 py-2 rounded hover:bg-gray-50">My Enrollments</Link>
            <Link to="/student/progress" className="block px-3 py-2 rounded hover:bg-gray-50">Progress</Link>
            <Link to="/student/profile" className="block px-3 py-2 rounded hover:bg-gray-50">Profile</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
