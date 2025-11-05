// src/pages/student/Home.jsx - PROFESSIONAL VERSION
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Professional Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Learn From
                <span className="text-blue-600 block">The Best</span>
                <span className="text-gray-700">Instructors</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 mb-8 leading-relaxed">
                Join thousands of students learning from industry experts. 
                Access 1000+ courses, advance your career, and achieve your goals.
              </p>
              
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative max-w-2xl">
                  <input
                    type="text"
                    placeholder="Search for courses, instructors, or topics..."
                    className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm"
                  />
                  <button className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                    Search
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowLoginOptions(true)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </button>
                <Link 
                  to="/courses"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all text-center"
                >
                  Browse Courses
                </Link>
              </div>
            </div>

            {/* Right Content - Login Options Card */}
            <div className="relative">
              {showLoginOptions ? (
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Continue As</h3>
                  <p className="text-gray-600 text-center mb-6">Select your role to continue</p>
                  
                  <div className="space-y-4">
                    {/* Student Login Card */}
                    <Link 
                      to="/login?role=student"
                      className="flex items-center p-4 border-2 border-green-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200">
                        <span className="text-green-600 font-bold text-lg">👨‍🎓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Student</h4>
                        <p className="text-sm text-gray-600">Access courses and learn</p>
                      </div>
                    </Link>

                    {/* Instructor Login Card */}
                    <Link 
                      to="/login?role=instructor"
                      className="flex items-center p-4 border-2 border-blue-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200">
                        <span className="text-blue-600 font-bold text-lg">👨‍🏫</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Instructor</h4>
                        <p className="text-sm text-gray-600">Create and manage courses</p>
                      </div>
                    </Link>

                    {/* Admin Login Card */}
                    <Link 
                      to="/login?role=admin"
                      className="flex items-center p-4 border-2 border-purple-100 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
                    >
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200">
                        <span className="text-purple-600 font-bold text-lg">⚙️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Administrator</h4>
                        <p className="text-sm text-gray-600">Manage platform</p>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-600 text-sm">
                      New user? <Link to="/signup" className="text-blue-600 hover:underline">Sign up here</Link>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white text-center shadow-2xl">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                  <p className="text-blue-100 mb-6">
                    50,000+ students • 500+ instructors • 1000+ courses
                  </p>
                  <button 
                    onClick={() => setShowLoginOptions(true)}
                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Start Learning
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">1K+</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-gray-600 text-lg">Most popular courses among our students</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "React Masterclass 2024", 
                instructor: "Sarah Johnson", 
                students: "2.5k", 
                rating: 4.9, 
                price: "₹1,299",
                category: "Development",
                image: "bg-gradient-to-r from-blue-500 to-cyan-500"
              },
              { 
                title: "Python for Data Science", 
                instructor: "Mike Chen", 
                students: "3.2k", 
                rating: 4.8, 
                price: "₹1,599",
                category: "Data Science",
                image: "bg-gradient-to-r from-green-500 to-teal-500"
              },
              { 
                title: "UI/UX Design Pro", 
                instructor: "Emma Davis", 
                students: "1.8k", 
                rating: 4.7, 
                price: "₹999",
                category: "Design",
                image: "bg-gradient-to-r from-purple-500 to-pink-500"
              }
            ].map((course, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className={`${course.image} h-48 relative`}>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-semibold">
                    ⭐ {course.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-3">By {course.instructor}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 text-sm">👥 {course.students} students</span>
                    <span className="text-lg font-bold text-green-600">{course.price}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/courses"
              className="inline-flex items-center text-blue-600 font-semibold text-lg hover:text-blue-700"
            >
              View All Courses
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-gray-600 text-lg">Everything you need to succeed in your learning journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📚",
                title: "1000+ Courses",
                description: "Learn from industry experts with quality courses across various domains"
              },
              {
                icon: "🎯",
                title: "Project Based",
                description: "Hands-on projects to build real-world experience and portfolio"
              },
              {
                icon: "🏆",
                title: "Certification",
                description: "Get recognized with industry-valued certificates upon completion"
              },
              {
                icon: "💼",
                title: "Career Support",
                description: "Career guidance, resume building, and interview preparation"
              },
              {
                icon: "🔄",
                title: "Lifetime Access",
                description: "Learn at your own pace with lifetime access to course materials"
              },
              {
                icon: "👥",
                title: "Community",
                description: "Join a community of learners and experts for networking"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 hover:bg-gray-50 rounded-2xl transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Join 50,000+ students who have transformed their careers with us
          </p>
          <button 
            onClick={() => setShowLoginOptions(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Get Started Today - It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">LMS</span>
                </div>
                <span className="ml-3 text-xl font-bold">LearnPro</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with quality education and industry-relevant skills.
              </p>
            </div>
            
            {['Platform', 'Support', 'Company', 'Legal'].map((section) => (
              <div key={section}>
                <h3 className="font-semibold mb-4">{section}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section === 'Platform' && (
                    <>
                      <li><Link to="/courses" className="hover:text-white transition-colors">Browse Courses</Link></li>
                      <li><Link to="/instructors" className="hover:text-white transition-colors">Instructors</Link></li>
                      <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                    </>
                  )}
                  {section === 'Support' && (
                    <>
                      <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                      <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                      <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                    </>
                  )}
                  {section === 'Company' && (
                    <>
                      <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                      <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                      <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                    </>
                  )}
                  {section === 'Legal' && (
                    <>
                      <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                      <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                      <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnPro LMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}