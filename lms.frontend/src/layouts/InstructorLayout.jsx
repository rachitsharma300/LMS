// src/layouts/InstructorLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

/**
 * 🎯 Enhanced InstructorLayout
 * 
 * Features:
 * ✅ Modern sidebar with course management icons
 * ✅ Quick stats overview for instructors
 * ✅ Mobile-responsive with hamburger menu
 * ✅ Active course indicators and badges
 * ✅ Earnings and student analytics
 * ✅ Smooth animations and professional design
 */

export default function InstructorLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [instructorStats, setInstructorStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEarnings: 0,
    averageRating: 0
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInstructorStats({
        totalStudents: 1247,
        totalCourses: 8,
        totalEarnings: 184500,
        averageRating: 4.8
      });
    }, 500);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  // Instructor navigation menu items
  const instructorMenuItems = [
    {
      id: "dashboard",
      title: "Instructor Dashboard",
      path: "/instructor/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10" />
        </svg>
      ),
      badge: null
    },
    {
      id: "courses",
      title: "My Courses",
      path: "/instructor/courses",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      badge: instructorStats.totalCourses,
      submenu: [
        { title: "All Courses", path: "/instructor/courses" },
        { title: "Published", path: "/instructor/courses/published" },
        { title: "Drafts", path: "/instructor/courses/drafts" },
        { title: "Archived", path: "/instructor/courses/archived" }
      ]
    },
    {
      id: "create",
      title: "Create Course",
      path: "/instructor/course/new",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      highlight: true
    },
    {
      id: "students",
      title: "Enrolled Students",
      path: "/instructor/students",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      badge: instructorStats.totalStudents
    },
    {
      id: "analytics",
      title: "Analytics",
      path: "/instructor/analytics",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      submenu: [
        { title: "Course Analytics", path: "/instructor/analytics/courses" },
        { title: "Student Progress", path: "/instructor/analytics/students" },
        { title: "Revenue Reports", path: "/instructor/analytics/revenue" },
        { title: "Engagement Metrics", path: "/instructor/analytics/engagement" }
      ]
    },
    {
      id: "communications",
      title: "Communications",
      path: "/instructor/communications",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      badge: "3",
      submenu: [
        { title: "Announcements", path: "/instructor/communications/announcements" },
        { title: "Messages", path: "/instructor/communications/messages" },
        { title: "Discussion Forums", path: "/instructor/communications/forums" }
      ]
    },
    {
      id: "earnings",
      title: "Earnings",
      path: "/instructor/earnings",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: "resources",
      title: "Resources",
      path: "/instructor/resources",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Instructor Hub</h2>
                <p className="text-xs text-gray-500">Teach & Inspire</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Total Earnings</span>
                <span className="font-semibold text-green-700">
                  {formatCurrency(instructorStats.totalEarnings)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Average Rating</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="font-semibold text-gray-900">{instructorStats.averageRating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {instructorMenuItems.map((item) => {
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
                            ? 'bg-green-50 text-green-700 border-r-2 border-green-600' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }
                        `}
                      >
                        <div className={`${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                          {item.icon}
                        </div>
                        
                        <span className="flex-1 text-left">{item.title}</span>
                        
                        {/* Badge */}
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
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
                                  ? 'bg-green-50 text-green-700 font-medium'
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
                          ? 'bg-green-50 text-green-700 border-r-2 border-green-600' 
                          : item.highlight
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className={`${isActive ? 'text-green-600' : item.highlight ? 'text-white' : 'text-gray-400'}`}>
                        {item.icon}
                      </div>
                      
                      <span className="flex-1">{item.title}</span>
                      
                      {/* Badge */}
                      {item.badge && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.highlight 
                            ? 'bg-white/20 text-white' 
                            : 'bg-green-100 text-green-800'
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

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Teaching Tips</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Engage students with interactive content and regular updates.
              </p>
              <button className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors">
                Learn More →
              </button>
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
                <h1 className="text-lg font-semibold text-gray-900">Instructor Hub</h1>
                <p className="text-xs text-gray-500">Teach & Inspire</p>
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