// src/pages/student/Home.jsx - CLEAN PROFESSIONAL VERSION
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAllCourses } from "../services/courseService";
import { getCurrentUser } from "../services/authService";
import Loader from "../components/Loader";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredCourses, setFeaturedCourses] = useState([]);

  // Load real courses from database
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const allCourses = await getAllCourses();
        const approvedCourses = allCourses.filter(course => course.approved);
        
        setCourses(approvedCourses);
        setFeaturedCourses(approvedCourses.slice(0, 10));
      } catch (error) {
        console.error("Error loading courses:", error);
        setCourses([]);
        setFeaturedCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  // ✅ Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0);
  };

  // ✅ Render rating stars
  const renderRating = (rating) => {
    if (!rating || rating === 0) return null;
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-gray-600">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-96">
          <Loader size="lg" text="Loading courses..." />
        </div>
      </div>
    );
  }

  const currentUser = getCurrentUser();

  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section - Clean */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Advance Your Career With
            <span className="text-blue-600 block">Expert-Led Courses</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Learn from industry professionals and master new skills with our curated course collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentUser ? (
              <Link
                to="/courses"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Courses
              </Link>
            ) : (
              <Link
                to="/courses"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Learning
              </Link>
            )}
            <Link
              to="/courses"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses - Real Data */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-gray-600">
              Handpicked courses to boost your skills
            </p>
          </div>

          {featuredCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
              <p className="text-gray-600">New courses coming soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Course Image */}
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    {course.coverImageUrl ? (
                      <img
                        src={course.coverImageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium text-gray-700">
                        {course.category || 'General'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      By {course.instructorName || 'Expert Instructor'}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>👥 {course.totalStudents || 0}</span>
                        {course.rating && (
                          <span className="flex items-center gap-1">
                            {renderRating(course.rating)}
                          </span>
                        )}
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(course.price || course.coursePrice || 0)}
                      </span>
                    </div>
                    
                    <Link
                      to={currentUser ? `/course/${course.id}` : '/login'}
                      className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors text-center block text-sm"
                    >
                      {currentUser ? 'View Course' : 'Enroll Now'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {courses.length > 6 && (
            <div className="text-center mt-8">
              <Link
                to="/courses"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                View All Courses ({courses.length})
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section - Simple */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {courses.length}+
              </div>
              <div className="text-gray-600 text-sm">Courses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                10K+
              </div>
              <div className="text-gray-600 text-sm">Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                100+
              </div>
              <div className="text-gray-600 text-sm">Instructors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 mb-1">
                94%
              </div>
              <div className="text-gray-600 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Minimal */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Learn With Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Expert Instructors",
                description: "Learn from industry professionals with real-world experience"
              },
              {
                icon: "📚", 
                title: "Quality Content",
                description: "Well-structured courses with practical projects and exercises"
              },
              {
                icon: "💼",
                title: "Career Focused",
                description: "Skills that matter in today's competitive job market"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-blue-100 mb-6">
            Join thousands of students advancing their careers
          </p>
          <Link
            to={currentUser ? "/courses" : "/login"}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            {currentUser ? "Continue Learning" : "Get Started Now"}
          </Link>
        </div>
      </section>

      {/* Professional Footer */}
      {/* <Footer /> */}
    </div>
  );
}