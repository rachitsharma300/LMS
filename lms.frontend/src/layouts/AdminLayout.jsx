// src/layouts/AdminLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

/**
 * AdminLayout
 * - Navbar on top
 * - Left sidebar with admin links (hidden on small screens)
 * - Main content area (children)
 */
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r hidden md:block">
          <div className="p-4 border-b">
            <h4 className="text-lg font-semibold">Admin Panel</h4>
          </div>

          <nav className="p-4 space-y-2 text-sm">
            <Link to="/admin/dashboard" className="block px-3 py-2 rounded hover:bg-gray-50">Dashboard</Link>
            <Link to="/admin/users" className="block px-3 py-2 rounded hover:bg-gray-50">Manage Users</Link>
            <Link to="/admin/courses" className="block px-3 py-2 rounded hover:bg-gray-50">Manage Courses</Link>
            <Link to="/admin/reports" className="block px-3 py-2 rounded hover:bg-gray-50">Reports</Link>
            <Link to="/admin/settings" className="block px-3 py-2 rounded hover:bg-gray-50">Settings</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
