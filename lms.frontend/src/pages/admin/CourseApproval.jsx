import React, { useState, useEffect } from 'react';

export default function CourseApproval() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - replace with actual API call later
    loadMockCourses();
  }, []);

  const loadMockCourses = () => {
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: "Advanced Web Development",
          description: "Learn modern web development with React, Node.js, and MongoDB",
          instructor: "Sarah Johnson",
          category: "Web Development",
          level: "Advanced",
          duration: "8 weeks",
          createdAt: "2024-01-15",
          status: "PENDING"
        },
        {
          id: 2,
          title: "Data Science Fundamentals",
          description: "Introduction to data analysis, visualization, and machine learning",
          instructor: "Mike Chen",
          category: "Data Science",
          level: "Beginner",
          duration: "6 weeks",
          createdAt: "2024-01-10",
          status: "PENDING"
        },
        {
          id: 3,
          title: "Mobile App Development with Flutter",
          description: "Build cross-platform mobile apps using Flutter and Dart",
          instructor: "Alex Rodriguez",
          category: "Mobile Development",
          level: "Intermediate",
          duration: "10 weeks",
          createdAt: "2024-01-08",
          status: "PENDING"
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleApprove = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: 'APPROVED' } : course
    ));
    // TODO: Add actual API call
    console.log(`Approved course ${courseId}`);
  };

  const handleReject = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: 'REJECTED' } : course
    ));
    // TODO: Add actual API call
    console.log(`Rejected course ${courseId}`);
  };

  const pendingCourses = courses.filter(course => course.status === 'PENDING');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Course Approval</h1>
        <p className="text-gray-600">Review and approve courses submitted by instructors.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="text-2xl font-bold text-gray-900">{pendingCourses.length}</div>
          <div className="text-sm text-gray-600">Pending Approval</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="text-2xl font-bold text-gray-900">
            {courses.filter(c => c.status === 'APPROVED').length}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="text-2xl font-bold text-gray-900">
            {courses.filter(c => c.status === 'REJECTED').length}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="text-2xl font-bold text-gray-900">{courses.length}</div>
          <div className="text-sm text-gray-600">Total Submitted</div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {pendingCourses.map((course, index) => (
          <div
            key={course.id}
            className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Course Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
              <h3 className="text-lg font-bold text-white line-clamp-2">{course.title}</h3>
              <p className="text-indigo-100 text-sm mt-1">By {course.instructor}</p>
            </div>

            {/* Course Content */}
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">Category</div>
                  <div className="text-sm font-medium text-gray-900">{course.category}</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">Level</div>
                  <div className="text-sm font-medium text-gray-900">{course.level}</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="text-sm font-medium text-gray-900">{course.duration}</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">Submitted</div>
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(course.id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(course.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {pendingCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
          <p className="text-gray-600">No pending courses for approval.</p>
          <p className="text-gray-400 text-sm mt-1">New courses will appear here when instructors submit them.</p>
        </div>
      )}
    </div>
  );
}