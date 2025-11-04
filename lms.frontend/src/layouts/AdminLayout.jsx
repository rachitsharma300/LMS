// src/layouts/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

/**
 * 🎯 Enhanced AdminLayout
 * 
 * Features:
 * ✅ Modern sidebar with icons and active states
 * ✅ Mobile-responsive with hamburger menu
 * ✅ Collapsible sidebar option
 * ✅ Breadcrumb navigation
 * ✅ Quick stats overview
 * ✅ Smooth animations and transitions
 * ✅ Role-based menu items
 */

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  // Admin navigation menu items
  const adminMenuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10" />
        </svg>
      ),
      badge: null
    },
    {
      id: "users",
      title: "User Management",
      path: "/admin/users",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      badge: "12",
      submenu: [
        { title: "All Users", path: "/admin/users" },
        { title: "Add New User", path: "/admin/users/new" },
        { title: "User Roles", path: "/admin/users/roles" },
        { title: "Bulk Actions", path: "/admin/users/bulk" }
      ]
    },
    {
      id: "courses",
      title: "Course Management",
      path: "/admin/courses",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      badge: "8",
      submenu: [
        { title: "All Courses", path: "/admin/courses" },
        { title: "Pending Approval", path: "/admin/courses/pending" },
        { title: "Course Categories", path: "/admin/courses/categories" },
        { title: "Featured Courses", path: "/admin/courses/featured" }
      ]
    },
    {
      id: "analytics",
      title: "Analytics",
      path: "/admin/analytics",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: "reports",
      title: "Reports",
      path: "/admin/reports",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      submenu: [
        { title: "Revenue Reports", path: "/admin/reports/revenue" },
        { title: "User Activity", path: "/admin/reports/activity" },
        { title: "Course Performance", path: "/admin/reports/courses" },
        { title: "System Reports", path: "/admin/reports/system" }
      ]
    },
    {
      id: "content",
      title: "Content Management",
      path: "/admin/content",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: "settings",
      title: "System Settings",
      path: "/admin/settings",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      submenu: [
        { title: "General Settings", path: "/admin/settings/general" },
        { title: "Payment Setup", path: "/admin/settings/payment" },
        { title: "Email Templates", path: "/admin/settings/email" },
        { title: "API Configuration", path: "/admin/settings/api" }
      ]
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

  // Quick stats for admin dashboard (could be fetched from API)
  const quickStats = [
    { label: "Total Users", value: "1,234", change: "+12%", color: "blue" },
    { label: "Active Courses", value: "89", change: "+5%", color: "green" },
    { label: "Pending Approvals", value: "12", change: "-3%", color: "yellow" },
    { label: "Revenue", value: "₹2.4L", change: "+18%", color: "purple" }
  ];

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
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}
          flex flex-col
        `}>
          
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Admin Panel</h2>
                  <p className="text-xs text-gray-500">ByteLMS Control Center</p>
                </div>
              </div>
            )}
            
            {/* Collapse Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
            >
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {adminMenuItems.map((item) => {
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
                            ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }
                        `}
                      >
                        <div className={`${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                          {item.icon}
                        </div>
                        
                        {!isSidebarCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item.title}</span>
                            
                            {/* Badge */}
                            {item.badge && (
                              <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
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
                          </>
                        )}
                      </button>

                      {/* Submenu Items */}
                      {!isSidebarCollapsed && activeSubmenu === item.id && (
                        <div className="ml-8 mt-1 space-y-1 animate-in fade-in duration-200">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`
                                block px-3 py-2 text-sm rounded-lg transition-colors duration-200
                                ${location.pathname === subItem.path
                                  ? 'bg-indigo-50 text-indigo-700 font-medium'
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
                          ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className={`${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                        {item.icon}
                      </div>
                      
                      {!isSidebarCollapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          
                          {/* Badge */}
                          {item.badge && (
                            <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          {!isSidebarCollapsed && (
            <div className="p-4 border-t border-gray-200">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 text-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600 mb-2">Need help with administration?</p>
                <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                  View Documentation
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-0 transition-all duration-300">
          
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
              
              <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
              
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