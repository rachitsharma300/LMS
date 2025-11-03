// src/pages/instructor/Dashboard.jsx
import React, { useEffect, useState } from "react";
import InstructorLayout from "../../layouts/InstructorLayout";
import * as courseService from "../../services/courseService";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await courseService.getMyCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Instructor Dashboard</h2>
          <Link
            to="/instructor/course/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + New Course
          </Link>
        </div>

        {loading ? (
          <Loader text="Loading your courses..." />
        ) : courses.length === 0 ? (
          <div className="text-gray-500">You haven't created any courses yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((c) => (
              <div key={c.id} className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-lg">{c.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{c.description}</p>
                <div className="mt-3 flex justify-between text-sm text-gray-500">
                  <span>{c.students?.length || 0} students</span>
                  <Link
                    to={`/instructor/course/${c.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </InstructorLayout>
  );
}
