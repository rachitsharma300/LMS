// src/pages/student/Dashboard.jsx
import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import * as courseService from "../../services/courseService";
import Loader from "../../components/Loader";
import CourseCard from "../../components/CourseCard";

export default function StudentDashboard() {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await courseService.getEnrolledCourses();
        setEnrolled(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  return (
    <StudentLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">My Courses</h2>
        {loading ? (
          <Loader text="Loading enrolled courses..." />
        ) : enrolled.length === 0 ? (
          <div className="text-gray-500">You have not enrolled in any courses yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolled.map((c) => (
              <CourseCard key={c.id} course={c} onView={() => {}} />
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
