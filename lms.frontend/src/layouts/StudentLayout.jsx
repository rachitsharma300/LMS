// src/layouts/StudentLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

/**
 * 🎯 Enhanced StudentLayout
 * 
 * Features:
 * ✅ Modern sidebar with learning-focused icons
 * ✅ Progress tracking and learning stats
 * ✅ Mobile-responsive with hamburger menu
 * ✅ Active learning indicators and badges
 * ✅ Quick access to enrolled courses
 * ✅ Learning resources and achievements
 */

export default function StudentLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [learningStats, setLearningStats] = useState({
    enrolledCourses: 0,
    completedLessons: 0,
    learningStreak: 0,
    totalHours: 0
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLearningStats({
        enrolledCourses: 6,
        completedLessons: 42,
        learningStreak: 7,
        totalHours: 28
      });
    }, 500);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  // Student navigation menu items
  const studentMenuItems = [
    {
      id: "dashboard",
      title: "Learning Dashboard",
      path: "/student/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10" />
        </svg>
      ),
      badge: null
    },
    {
      id: "browse",
      title: "Browse Courses",
      path: "/courses",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      highlight: true
    },
    {
      id: "enrollments",
      title: "My Enrollments",
      path: "/student/enrollments",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      badge: learningStats.enrolledCourses,
      submenu: [
        { title: "All Courses", path: "/student/enrollments" },
        { title: "In Progress", path: "/student/enrollments/in-progress" },
        { title: "Completed", path: "/student/enrollments/completed" },
        { title: "Bookmarks", path: "/student/enrollments/bookmarks" }
      ]
    },
    {
      id: "progress",
      title: "Learning Progress",
      path: "/student/progress",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: "resources",
      title: "Learning Resources",
      path: "/student/resources",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      submenu: [
        { title: "Study Materials", path: "/student/resources/materials" },
        { title: "Video Library", path: "/student/resources/videos" },
        { title: "Practice Tests", path: "/student/resources/tests" },
        { title: "Download Center", path: "/student/resources/downloads" }
      ]
    },
    {
      id: "achievements",
      title: "Achievements",
      path: "/student/achievements",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      badge: "3"
    },
    {
      id: "community",
      title: "Community",
      path: "/student/community",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      submenu: [
        { title: "Discussion Forums", path: "/student/community/forums" },
        { title: "Study Groups", path: "/student/community/groups" },
        { title: "Peer Learning", path: "/student/community/peer-learning" }
      ]
    },
    {
      id: "support",
      title: "Help & Support",
      path: "/student/support",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // Check if a menu item is active
  const isMenuItemActive = (menuItem) => {
    if (menuItem.path === location.pathname) return true;
    if (menuItem.submenu) {
      return menuItem.submenu.some(subItem => subItem.path === location.pathname);
    }
    return false;
  };

  // Toggle submenu
  const toggleSubmenu = (menuId) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  // Render learning streak
  const renderStreak = (streak) => {
    return (
      <div className="flex items-center gap-1">
        <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
        </svg>
        <span className="font-semibold text-gray-900">{streak} days</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Enhanced Navbar */}
      <Navbar />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 relative">
        
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          w-64
          flex flex-col
        `}>
          
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Learning Hub</h2>
                <p className="text-xs text-gray-500">Grow Your Skills</p>
              </div>
            </div>
          </div>

          {/* Learning Stats */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Learning Streak</span>
                {renderStreak(learningStats.learningStreak)}
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-blue-700">
                  {learningStats.completedLessons} lessons
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {studentMenuItems.map((item) => {
              const isActive = isMenuItemActive(item);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              
              return (
                <div key={item.id}>
                  {hasSubmenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.id)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${isActive 
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }
                        `}
                      >
                        <div className={`${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                          {item.icon}
                        </div>
                        
                        <span className="flex-1 text-left">{item.title}</span>
                        
                        {/* Badge */}
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        
                        {/* Submenu Arrow */}
                        <svg 
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            activeSubmenu === item.id ? 'rotate-90' : ''
                          }`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Submenu Items */}
                      {activeSubmenu === item.id && (
                        <div className="ml-8 mt-1 space-y-1 animate-in fade-in duration-200">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`
                                block px-3 py-2 text-sm rounded-lg transition-colors duration-200
                                ${location.pathname === subItem.path
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }
                              `}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                          : item.highlight
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className={`${isActive ? 'text-blue-600' : item.highlight ? 'text-white' : 'text-gray-400'}`}>
                        {item.icon}
                      </div>
                      
                      <span className="flex-1">{item.title}</span>
                      
                      {/* Badge */}
                      {item.badge && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.highlight 
                            ? 'bg-white/20 text-white' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sidebar Footer - Learning Motivation */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Daily Motivation</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                "The beautiful thing about learning is that no one can take it away from you."
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">- B.B. King</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div key={dot} className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-0 min-w-0">
          
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="text-center">
                <h1 className="text-lg font-semibold text-gray-900">Learning Hub</h1>
                <p className="text-xs text-gray-500">Grow Your Skills</p>
              </div>
              
              <div className="w-9"></div> {/* Spacer for balance */}
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}