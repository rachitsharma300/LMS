// src/pages/student/CourseCatalog.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import StudentLayout from "../../layouts/StudentLayout";
import { Link } from "react-router-dom";

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);

  useEffect(() => {
    apiClient.get("/student/courses/available")
      .then(res => {
        setCourses(res.data);
        setFilteredCourses(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const enrollCourse = async (courseId) => {
    setEnrolling(courseId);
    try {
      await apiClient.post(`/student/enroll/${courseId}`);
      // Update local state to reflect enrollment
      setCourses(prev => prev.filter(course => course.id !== courseId));
      setFilteredCourses(prev => prev.filter(course => course.id !== courseId));
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment Failed");
    } finally {
      setEnrolling(null);
    }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Courses</h1>
        <p className="text-gray-600">Discover new skills and advance your career</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} available
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
                <div className="flex items-center gap-2 text-white text-sm">
                  <span>📖</span>
                  <span>{course.lessonCount || 0} lessons</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
              
              <div className="flex items-center justify-between">
                <Link 
                  to={`/student/course/${course.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors duration-200"
                >
                  View Details <span>→</span>
                </Link>
                
                <button
                  onClick={() => enrollCourse(course.id)}
                  disabled={enrolling === course.id}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2"
                >
                  {enrolling === course.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <span>+</span>
                      Enroll
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search terms</p>
        </div>
      )}
    </StudentLayout>
  );
}