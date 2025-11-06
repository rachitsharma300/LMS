// src/pages/student/MyLearning.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import StudentLayout from "../../layouts/StudentLayout";
import { Link } from "react-router-dom";

export default function MyLearning() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/student/my-courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const CourseProgress = ({ completed, total }) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    
    return (
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          ></div>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning</h1>
        <p className="text-gray-600">Continue your learning journey and track your progress</p>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-r from-green-500 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{course.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                
                <CourseProgress 
                  completed={course.completedLessons || 0} 
                  total={course.totalLessons || 0} 
                />
                
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <span>✅</span>
                    {course.completedLessons || 0} completed
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📖</span>
                    {course.totalLessons || 0} total
                  </span>
                </div>

                <Link
                  to={`/student/course/${course.id}`}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 text-center block"
                >
                  Continue Learning →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-6">🎓</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Learning Journey</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't enrolled in any courses yet. Explore our course catalog to find the perfect course for your goals.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-xl font-medium transition-all duration-200"
          >
            <span>🔍</span>
            Browse Courses
          </Link>
        </div>
      )}
    </StudentLayout>
  );
}