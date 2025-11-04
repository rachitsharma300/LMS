// src/pages/student/Dashboard.jsx
import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import * as courseService from "../../services/courseService";
import Loader from "../../components/Loader";
import CourseCard from "../../components/CourseCard";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgress: 0,
    learningStreak: 0,
    totalHours: 0
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulate API calls - replace with actual API calls
        const enrolledData = await courseService.getEnrolledCourses();
        
        // Mock data for demonstration
        const mockEnrolled = [
          {
            id: 1,
            title: "React Masterclass 2024",
            description: "Complete React development course with hooks, context, and advanced patterns",
            instructorName: "John Doe",
            price: 2999,
            thumbnail: "/api/placeholder/300/200",
            category: "Web Development",
            rating: 4.9,
            totalStudents: 1247,
            duration: "28h 45m",
            level: "Intermediate",
            progress: 65,
            lastAccessed: "2 hours ago",
            isEnrolled: true
          },
          {
            id: 2,
            title: "Node.js Backend Development",
            description: "Build scalable backend applications with Node.js and Express",
            instructorName: "Sarah Wilson",
            price: 2499,
            thumbnail: "/api/placeholder/300/200",
            category: "Backend Development",
            rating: 4.7,
            totalStudents: 856,
            duration: "22h 30m",
            level: "Intermediate",
            progress: 30,
            lastAccessed: "1 day ago",
            isEnrolled: true
          },
          {
            id: 3,
            title: "Advanced JavaScript Patterns",
            description: "Master advanced JavaScript concepts and design patterns",
            instructorName: "Mike Johnson",
            price: 1999,
            thumbnail: "/api/placeholder/300/200",
            category: "Programming",
            rating: 4.8,
            totalStudents: 923,
            duration: "18h 15m",
            level: "Advanced",
            progress: 100,
            lastAccessed: "3 days ago",
            isEnrolled: true
          },
          {
            id: 4,
            title: "TypeScript Fundamentals",
            description: "Learn TypeScript from scratch with practical examples",
            instructorName: "Emily Chen",
            price: 1799,
            thumbnail: "/api/placeholder/300/200",
            category: "Programming",
            rating: 4.6,
            totalStudents: 645,
            duration: "15h 20m",
            level: "Beginner",
            progress: 0,
            lastAccessed: "Not started",
            isEnrolled: true
          }
        ];

        const mockStats = {
          totalCourses: 6,
          completedCourses: 2,
          inProgress: 3,
          learningStreak: 7,
          totalHours: 42
        };

        setEnrolled(mockEnrolled);
        setStats(mockStats);

      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Handle course view
  const handleViewCourse = (courseId) => {
    // Navigate to course viewer
    window.location.href = `/student/course/${courseId}`;
  };

  // Handle course enrollment (for recommended courses)
  const handleEnrollCourse = (courseId) => {
    console.log("Enrolling in course:", courseId);
    // Add enrollment logic here
  };

  // Render learning streak
  const renderStreak = (streak) => {
    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {streak}
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{streak} days</div>
          <div className="text-sm text-gray-600">Learning Streak</div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-96">
          <Loader size="lg" text="Loading your learning dashboard..." variant="modern" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Continue your learning journey.</p>
          </div>
          <Link
            to="/courses"
            className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Courses
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Learning Streak Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            {renderStreak(stats.learningStreak)}
          </div>

          {/* Total Courses Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCourses}</p>
                <div className="flex items-center gap-1 mt-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm text-green-600">+2 this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed Courses Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedCourses}</p>
                <div className="text-sm text-gray-500 mt-2">Courses finished</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Learning Hours Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalHours}h</p>
                <div className="flex items-center gap-1 mt-2">
                  <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-purple-600">+5h this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
              <span className="text-sm text-gray-600">
                {enrolled.filter(c => c.progress > 0 && c.progress < 100).length} courses in progress
              </span>
            </div>
          </div>

          {enrolled.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Start your learning journey by enrolling in courses that match your interests and career goals.
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse All Courses
              </Link>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {enrolled
                  .filter(course => course.progress > 0 && course.progress < 100)
                  .sort((a, b) => b.progress - a.progress)
                  .map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      onView={handleViewCourse}
                      onEnroll={handleEnrollCourse}
                      showProgress={true}
                      isEnrolled={true}
                    />
                  ))}
                
                {/* Show message if no in-progress courses */}
                {enrolled.filter(course => course.progress > 0 && course.progress < 100).length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses in progress</h3>
                    <p className="text-gray-600 mb-4">Start a new course or continue with your enrolled courses.</p>
                    <Link
                      to="/courses"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Browse Courses
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* All Enrolled Courses Section */}
        {enrolled.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All My Courses</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {enrolled.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onView={handleViewCourse}
                    onEnroll={handleEnrollCourse}
                    showProgress={true}
                    isEnrolled={true}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Learning Motivation Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Daily Learning Tip</h3>
              <p className="text-gray-700 mb-4">
                "Consistency is key to mastery. Even 30 minutes of focused learning every day can lead to remarkable progress over time. 
                Try to maintain your learning streak by completing at least one lesson daily!"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Keep up the great work! 🚀</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div key={dot} className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}