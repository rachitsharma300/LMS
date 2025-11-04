// src/components/common/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  // Get user role display name with proper formatting
  const getPrimaryRole = () => {
    if (!user?.roles) return null;
    const roles = Array.isArray(user.roles) ? user.roles : [user.roles];
    if (roles.includes("ADMIN")) return "Administrator";
    if (roles.includes("INSTRUCTOR")) return "Instructor";
    if (roles.includes("STUDENT")) return "Student";
    return "User";
  };

  // Role-based navigation links
  const roleLinks = () => {
    if (!user?.roles) return null;
    const roles = Array.isArray(user.roles) ? user.roles : [user.roles];
    
    return (
      <div className="hidden lg:flex items-center gap-1">
        {roles.includes("ADMIN") && (
          <Link 
            to="/admin/dashboard" 
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 flex items-center gap-2 group"
          >
            <span className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-125 transition-transform"></span>
            Admin Panel
          </Link>
        )}
        {roles.includes("INSTRUCTOR") && (
          <Link 
            to="/instructor/dashboard" 
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 flex items-center gap-2 group"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-125 transition-transform"></span>
            Instructor Hub
          </Link>
        )}
        {roles.includes("STUDENT") && (
          <Link 
            to="/student/dashboard" 
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 flex items-center gap-2 group"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></span>
            My Learning
          </Link>
        )}
      </div>
    );
  };

  // User avatar with fallback
  const getUserAvatar = () => {
    if (user?.avatar) {
      return <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />;
    }
    
    // Generate avatar from initials with colored background
    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-blue-500'];
    const colorIndex = (initials.charCodeAt(0) || 0) % colors.length;
    
    return (
      <div className={`w-8 h-8 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white text-sm font-semibold`}>
        {initials}
      </div>
    );
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-white border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and Brand */}
            <div className="flex items-center gap-4 flex-1">
              <Link 
                to="/" 
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <img 
                    src="/logo.png" 
                    alt="ByteLMS" 
                    className="w-10 h-10 object-contain transition-transform group-hover:scale-110 duration-300" 
                  />
                  <div className="absolute inset-0 bg-indigo-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ByteLMS
                </span>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-1 ml-8">
                <Link 
                  to="/" 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === '/' 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/courses" 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === '/courses' 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  Browse Courses
                </Link>
              </div>
            </div>

            {/* Role-based Links */}
            <div className="hidden lg:block">
              {roleLinks()}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              
              {user ? (
                <>
                  {/* Desktop User Info */}
                  <div className="hidden md:flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
                        {user.name || user.username}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {getPrimaryRole()}
                      </div>
                    </div>
                    
                    {/* User Avatar with Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        {getUserAvatar()}
                        <svg 
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                            isUserMenuOpen ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* User Dropdown Menu */}
                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in duration-200">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="text-sm font-semibold text-gray-900">{user.name || user.username}</div>
                            <div className="text-xs text-gray-500 truncate">{user.email}</div>
                          </div>
                          
                          <div className="py-2">
                            <Link 
                              to="/profile" 
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              My Profile
                            </Link>
                            <Link 
                              to="/settings" 
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Settings
                            </Link>
                          </div>
                          
                          <div className="border-t border-gray-100 pt-2">
                            <button
                              onClick={logout}
                              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Logout Button */}
                  <button
                    onClick={logout}
                    className="md:hidden p-2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </>
              ) : (
                /* Authentication Buttons for Guests */
                <div className="flex items-center gap-2">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 hidden sm:block"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-4">
              
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link to="/" className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                  Home
                </Link>
                <Link to="/courses" className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                  Browse Courses
                </Link>
              </div>

              {/* Mobile Role Links for Logged-in Users */}
              {user && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                    Your Dashboards
                  </div>
                  <div className="space-y-2">
                    {user.roles?.includes("ADMIN") && (
                      <Link to="/admin/dashboard" className="flex items-center gap-3 py-3 px-4 rounded-lg text-purple-700 bg-purple-50 transition-colors">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Admin Panel
                      </Link>
                    )}
                    {user.roles?.includes("INSTRUCTOR") && (
                      <Link to="/instructor/dashboard" className="flex items-center gap-3 py-3 px-4 rounded-lg text-green-700 bg-green-50 transition-colors">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Instructor Hub
                      </Link>
                    )}
                    {user.roles?.includes("STUDENT") && (
                      <Link to="/student/dashboard" className="flex items-center gap-3 py-3 px-4 rounded-lg text-blue-700 bg-blue-50 transition-colors">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        My Learning
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Auth Links for Guests */}
              {!user && (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link to="/login" className="block py-3 px-4 rounded-lg text-center text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup" className="block py-3 px-4 rounded-lg text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg transition-all">
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}