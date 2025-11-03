// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import * as userService from "../../services/userService";
import * as courseService from "../../services/courseService";
import Loader from "../../components/Loader";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, courses: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await userService.getAllUsers();
        const courses = await courseService.getAllCourses();
        setStats({ users: users.length, courses: courses.length });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
        {loading ? (
          <Loader text="Loading dashboard..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-600">Total Users</h3>
              <p className="text-3xl font-bold mt-2">{stats.users}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-600">Total Courses</h3>
              <p className="text-3xl font-bold mt-2">{stats.courses}</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
