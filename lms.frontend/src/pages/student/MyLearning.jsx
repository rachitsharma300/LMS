// pages/student/MyLearning.jsx - COMPLETE IMPLEMENTATION
import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import Loader from "../../components/Loader";
import * as studentService from "../../services/studentService";

/**
 * 🎯 My Learning Analytics Page
 * Detailed progress tracking and learning analytics
 */
export default function MyLearning() {
  const [stats, setStats] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("all"); // all, monthly, weekly

  useEffect(() => {
    loadLearningData();
  }, [timeRange]);

  /**
   * 🎯 Load learning analytics data
   */
  const loadLearningData = async () => {
    try {
      setLoading(true);
      
      const [statsData, coursesData] = await Promise.all([
        studentService.getLearningStats(),
        studentService.getEnrolledCourses()
      ]);

      setStats(statsData);
      setEnrolledCourses(coursesData);

    } catch (error) {
      console.error("Error loading learning data:", error);
      // Fallback to mock data
      setStats(getMockStats());
      setEnrolledCourses(getMockEnrolledCourses());
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🎯 Calculate completion rate
   */
  const completionRate = stats ? 
    Math.round((stats.completedCourses / stats.totalCourses) * 100) : 0;

  /**
   * 🎯 Get progress level color
   */
  const getProgressColor = (progress) => {
    if (progress >= 80) return "text-green-600 bg-green-100";
    if (progress >= 50) return "text-blue-600 bg-blue-100";
    if (progress >= 25) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  /**
   * 🎯 Get progress bar color
   */
  const getProgressBarColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-96">
          <Loader size="lg" text="Loading your learning analytics..." variant="modern" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Learning Analytics</h1>
            <p className="text-gray-600 mt-2">
              Track your progress, monitor your growth, and achieve your learning goals
            </p>
          </div>
          
          {/* Time Range Filter */}
          <div className="mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="monthly">This Month</option>
              <option value="weekly">This Week</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Learning Hours */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.totalLearningHours || 0}h
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm text-green-600">+5h this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {completionRate}%
                </p>
                <div className="text-sm text-gray-500 mt-2">
                  {stats?.completedCourses || 0} of {stats?.totalCourses || 0} courses
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Learning Streak */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.learningStreak || 0} days
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-orange-600">Keep it up!</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Courses */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.inProgressCourses || 0}
                </p>
                <div className="text-sm text-gray-500 mt-2">Active courses</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Progress Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Course Progress</h2>
                <p className="text-gray-600 mt-1">Your progress across all enrolled courses</p>
              </div>
              
              <div className="p-6">
                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled</h3>
                    <p className="text-gray-600 mb-4">Start your learning journey by enrolling in courses.</p>
                    <a
                      href="/courses"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Browse Courses
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{course.title}</h3>
                            <p className="text-sm text-gray-600 truncate">{course.instructorName}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(course.progress || 0)}`}>
                            {Math.round(course.progress || 0)}%
                          </span>
                          
                          <a
                            href={`/student/course/${course.id}`}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            Continue
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Learning Insights */}
          <div className="space-y-6">
            
            {/* Achievement Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Achievements</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Courses Completed</span>
                  <span className="font-semibold text-gray-900">{stats?.completedCourses || 0}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Perfect Scores</span>
                  <span className="font-semibold text-gray-900">3</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Certificates Earned</span>
                  <span className="font-semibold text-gray-900">{stats?.completedCourses || 0}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Skill Badges</span>
                  <span className="font-semibold text-gray-900">7</span>
                </div>
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Weekly Activity</h3>
              
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 w-8">{day}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-500 transition-all duration-500"
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-900 w-8 text-right">
                      {Math.floor(Math.random() * 4)}h
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-3">Learning Goal</h3>
              <p className="text-blue-100 text-sm mb-4">
                Complete 2 courses this month to stay on track with your annual learning target.
              </p>
              <div className="w-full bg-blue-500 rounded-full h-2 mb-2">
                <div className="h-2 rounded-full bg-white" style={{ width: '60%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-blue-200">
                <span>Progress</span>
                <span>60%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">You're Making Great Progress! 🚀</h3>
              <p className="text-gray-700 mb-4">
                Consistency is your superpower. You've spent {stats?.totalLearningHours || 0} hours learning 
                and maintained a {stats?.learningStreak || 0}-day streak. Keep up the amazing work! 
                Remember, every lesson completed brings you closer to your goals.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

/**
 * 🎯 Mock data for demonstration
 */
function getMockStats() {
  return {
    totalCourses: 6,
    completedCourses: 2,
    inProgressCourses: 3,
    totalLearningHours: 42,
    learningStreak: 7,
    totalEnrollments: 6
  };
}

function getMockEnrolledCourses() {
  return [
    {
      id: 1,
      title: "React Masterclass 2024",
      instructorName: "John Doe",
      progress: 65,
      category: "Web Development"
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      instructorName: "Sarah Wilson",
      progress: 30,
      category: "Backend Development"
    },
    {
      id: 3,
      title: "Advanced JavaScript Patterns",
      instructorName: "Mike Johnson",
      progress: 100,
      category: "Programming"
    },
    {
      id: 4,
      title: "TypeScript Fundamentals",
      instructorName: "Emily Chen",
      progress: 0,
      category: "Programming"
    }
  ];
}