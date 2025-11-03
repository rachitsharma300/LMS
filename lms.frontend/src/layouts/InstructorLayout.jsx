// src/layouts/InstructorLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

/**
 * InstructorLayout
 * - Navbar on top
 * - Sidebar with instructor links
 * - Children area for pages like My Courses, Create Course, Students
 */
export default function InstructorLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r hidden md:block">
          <div className="p-4 border-b">
            <h4 className="text-lg font-semibold">Instructor</h4>
          </div>

          <nav className="p-4 space-y-2 text-sm">
            <Link to="/instructor/dashboard" className="block px-3 py-2 rounded hover:bg-gray-50">Dashboard</Link>
            <Link to="/instructor/my-courses" className="block px-3 py-2 rounded hover:bg-gray-50">My Courses</Link>
            <Link to="/instructor/course/new" className="block px-3 py-2 rounded hover:bg-gray-50">Create Course</Link>
            <Link to="/instructor/students" className="block px-3 py-2 rounded hover:bg-gray-50">Enrolled Students</Link>
            <Link to="/instructor/profile" className="block px-3 py-2 rounded hover:bg-gray-50">Profile</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
