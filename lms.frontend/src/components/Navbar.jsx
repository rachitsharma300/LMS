// src/components/Navbar.jsx - PROFESSIONAL VERSION
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
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
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' 
          : 'bg-white border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo - Only Text */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center gap-2 group"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-lg">LMS</span>
                  </div>
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LearnPro
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <Link 
                to="/" 
                className={`font-medium transition-all duration-200 ${
                  location.pathname === '/' 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/courses" 
                className={`font-medium transition-all duration-200 ${
                  location.pathname === '/courses' 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Courses
              </Link>
              <Link 
                to="/instructors" 
                className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Instructors
              </Link>
              <Link 
                to="/pricing" 
                className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </Link>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              
              {user ? (
                // Logged In User
                <div className="flex items-center gap-4">
                  {/* User Info */}
                  <div className="hidden md:flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {user.name || user.username}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </div>
                    </div>
                    
                    {/* User Avatar */}
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {(user.name || user.username).charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Button */}
                  <Link 
                    to={`/${user.role}/dashboard`}
                    className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Dashboard
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="hidden sm:block text-gray-600 hover:text-red-600 font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // Guest User
                <div className="flex items-center gap-3">
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors hidden sm:block"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                <Link to="/" className="block py-2 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link to="/courses" className="block py-2 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Courses
                </Link>
                <Link to="/instructors" className="block py-2 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Instructors
                </Link>
                <Link to="/pricing" className="block py-2 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Pricing
                </Link>
              </div>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {(user.name || user.username).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.name || user.username}</div>
                        <div className="text-sm text-gray-500 capitalize">{user.role}</div>
                      </div>
                    </div>
                    <Link 
                      to={`/${user.role}/dashboard`}
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-red-600 text-center py-3 font-medium hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block w-full text-center py-3 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Sign In
                    </Link>
                    <Link to="/signup" className="block w-full text-center py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}