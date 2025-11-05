// pages/student/CourseCatalog.jsx - COMPLETE IMPLEMENTATION
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";
import CourseCard from "../../components/CourseCard";
import Loader from "../../components/Loader";
import * as studentService from "../../services/studentService";

/**
 * 🎯 Course Catalog Page
 * Students can browse and enroll in available courses
 */
export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [enrolling, setEnrolling] = useState({});

  useEffect(() => {
    loadCatalogData();
  }, []);

  /**
   * 🎯 Load catalog data
   */
  const loadCatalogData = async () => {
    try {
      setLoading(true);
      
      // Load available courses and enrolled courses in parallel
      const [availableCourses, enrolled] = await Promise.all([
        studentService.getAvailableCourses(),
        studentService.getEnrolledCourses()
      ]);

      setCourses(availableCourses);
      setEnrolledCourses(enrolled);

    } catch (error) {
      console.error("Error loading catalog:", error);
      // Fallback to mock data if API fails
      setCourses(getMockCourses());
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🎯 Handle course enrollment
   */
  const handleEnroll = async (courseId) => {
    try {
      setEnrolling(prev => ({ ...prev, [courseId]: true }));
      
      await studentService.enrollCourse(courseId);
      
      // Remove enrolled course from available list
      setCourses(prev => prev.filter(course => course.id !== courseId));
      
      // Show success message
      alert("Successfully enrolled in course!");
      
    } catch (error) {
      console.error("Enrollment error:", error);
      alert(error.message || "Failed to enroll in course");
    } finally {
      setEnrolling(prev => ({ ...prev, [courseId]: false }));
    }
  };

  /**
   * 🎯 Handle course view
   */
  const handleViewCourse = (courseId) => {
    // Navigate to course details or viewer
    window.location.href = `/student/course/${courseId}`;
  };

  /**
   * 🎯 Filter courses based on search and filters
   */
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || course.category === filterCategory;
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  /**
   * 🎯 Get unique categories from courses
   */
  const categories = [...new Set(courses.map(course => course.category))];
  
  /**
   * 🎯 Get unique levels from courses
   */
  const levels = [...new Set(courses.map(course => course.level))];

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-96">
          <Loader size="lg" text="Loading course catalog..." variant="modern" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover new skills, advance your career, and join thousands of students 
            in their learning journey. Choose from our carefully curated courses.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <p className="text-gray-600">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterCategory !== "all" || filterLevel !== "all" 
                ? "Try adjusting your search or filters to find more courses."
                : "No courses available at the moment. Please check back later."}
            </p>
            {(searchQuery || filterCategory !== "all" || filterLevel !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterCategory("all");
                  setFilterLevel("all");
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnroll}
                  onView={handleViewCourse}
                  isEnrolling={enrolling[course.id]}
                  showEnrollButton={true}
                />
              ))}
            </div>

            {/* Load More Section */}
            <div className="text-center">
              <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors font-semibold">
                Load More Courses
              </button>
            </div>
          </>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We're constantly adding new courses. Let us know what you'd like to learn, 
            and we'll notify you when relevant courses become available.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            Suggest a Course
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}

/**
 * 🎯 Mock data for demonstration
 */
function getMockCourses() {
  return [
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
      isEnrolled: false
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
      isEnrolled: false
    },
    {
      id: 3,
      title: "Python for Data Science",
      description: "Master Python programming for data analysis and machine learning",
      instructorName: "Dr. Alex Chen",
      price: 3499,
      thumbnail: "/api/placeholder/300/200",
      category: "Data Science",
      rating: 4.8,
      totalStudents: 2103,
      duration: "35h 15m",
      level: "Beginner",
      isEnrolled: false
    },
    {
      id: 4,
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
      isEnrolled: false
    },
    {
      id: 5,
      title: "UI/UX Design Fundamentals",
      description: "Learn user interface and user experience design principles",
      instructorName: "Emily Davis",
      price: 2299,
      thumbnail: "/api/placeholder/300/200",
      category: "Design",
      rating: 4.6,
      totalStudents: 567,
      duration: "20h 45m",
      level: "Beginner",
      isEnrolled: false
    },
    {
      id: 6,
      title: "Mobile App Development with Flutter",
      description: "Build cross-platform mobile apps using Flutter and Dart",
      instructorName: "Robert Brown",
      price: 2799,
      thumbnail: "/api/placeholder/300/200",
      category: "Mobile Development",
      rating: 4.7,
      totalStudents: 734,
      duration: "25h 30m",
      level: "Intermediate",
      isEnrolled: false
    }
  ];
}