// src/pages/student/Dashboard.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import StudentLayout from "../../layouts/StudentLayout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get("/student/stats"),
      apiClient.get("/student/my-courses?limit=3")
    ])
      .then(([statsRes, coursesRes]) => {
        setStats(statsRes.data);
        setRecentCourses(coursesRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const ProgressCircle = ({ percentage, size = 100 }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Track your learning progress and continue your journey</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Enrolled Courses</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCourses || 0}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/student/learning" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
              View all courses <span>→</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed Lessons</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.completedLessons || 0}</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">Keep up the great work!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col items-center">
            <p className="text-gray-600 text-sm font-medium mb-4">Overall Progress</p>
            <ProgressCircle percentage={stats.progressPercentage || 0} size={80} />
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Courses</h2>
          <Link to="/student/learning" className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentCourses.length > 0 ? recentCourses.map(course => (
            <div key={course.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">📖</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
              <Link
                to={`/student/course/${course.id}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 text-center block"
              >
                Continue Learning
              </Link>
            </div>
          )) : (
            <div className="col-span-3 text-center py-8">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
              <p className="text-gray-600 mb-4">Start your learning journey by enrolling in courses</p>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}