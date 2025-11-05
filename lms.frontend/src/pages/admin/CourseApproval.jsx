import React, { useState, useEffect } from 'react';
import * as courseService from '../../services/courseService';

export default function CourseApproval() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    coverImageUrl: '',
  });
  const [editCourseData, setEditCourseData] = useState({
    title: '',
    description: '',
    coverImageUrl: ''
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const coursesData = await courseService.getAllCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (courseId) => {
    try {
      const courseToUpdate = courses.find(c => c.id === courseId);
      const updatedCourse = await courseService.updateCourse(courseId, {
        title: courseToUpdate.title,
        description: courseToUpdate.description,
        coverImageUrl: courseToUpdate.coverImageUrl || '',
        instructorId: courseToUpdate.instructorId || 1,
        approved: true // ✅ APPROVE
      });
      
      // ✅ Update frontend state with returned course
      setCourses(courses.map(course => 
        course.id === courseId ? updatedCourse : course
      ));
      console.log(`Approved course ${courseId}`);
    } catch (error) {
      console.error('Error approving course:', error);
      alert('Error approving course: ' + error.message);
    }
  };

  // const handleReject = async (courseId) => {
  //   try {
  //     const courseToUpdate = courses.find(c => c.id === courseId);
  //     const updatedCourse = await courseService.updateCourse(courseId, {
  //       title: courseToUpdate.title,
  //       description: courseToUpdate.description,
  //       coverImageUrl: courseToUpdate.coverImageUrl || '',
  //       instructorId: courseToUpdate.instructorId || 1,
  //       approved: false // ✅ REJECT
  //     });
      
  //     // ✅ Update frontend state with returned course
  //     setCourses(courses.map(course => 
  //       course.id === courseId ? updatedCourse : course
  //     ));
  //     console.log(`Rejected course ${courseId}`);
  //   } catch (error) {
  //     console.error('Error rejecting course:', error);
  //     alert('Error rejecting course: ' + error.message);
  //   }
  // };


  const handleReject = async (courseId) => {
  try {
    const courseToUpdate = courses.find(c => c.id === courseId);
    console.log("📝 Before reject - Course:", courseToUpdate);
    
    const updatedCourse = await courseService.updateCourse(courseId, {
      title: courseToUpdate.title,
      description: courseToUpdate.description,
      coverImageUrl: courseToUpdate.coverImageUrl || '',
      instructorId: courseToUpdate.instructorId || 1,
      approved: false
    });
    
    console.log("✅ After reject - Updated course:", updatedCourse);
    
    // ✅ FIX: Use the returned course from backend
    setCourses(courses.map(course => 
      course.id === courseId ? updatedCourse : course
    ));
    
    console.log(`Rejected course ${courseId}`);
  } catch (error) {
    console.error('Error rejecting course:', error);
  }
};

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(courseId);
        setCourses(courses.filter(course => course.id !== courseId));
        console.log(`Deleted course ${courseId}`);
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course: ' + error.message);
      }
    }
  };

  const handleAddCourse = async () => {
    try {
      const courseData = {
        title: newCourse.title,
        description: newCourse.description,
        coverImageUrl: newCourse.coverImageUrl || '',
        instructorId: 1, // Admin ID
        approved: true // Admin created courses auto-approved
      };
      
      const createdCourse = await courseService.createCourse(courseData);
      setCourses([createdCourse, ...courses]);
      setShowAddCourse(false);
      setNewCourse({
        title: '',
        description: '',
        coverImageUrl: '',
      });
      console.log('Course added successfully');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Error adding course: ' + error.message);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setEditCourseData({
      title: course.title,
      description: course.description,
      coverImageUrl: course.coverImageUrl || ''
    });
    setShowEditModal(true);
  };

  const handleUpdateCourse = async () => {
    try {
      const updatedCourse = await courseService.updateCourse(editingCourse.id, {
        ...editCourseData,
        instructorId: editingCourse.instructorId || 1,
        approved: editingCourse.approved // Keep existing approval status
      });
      
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? updatedCourse : course
      ));
      setShowEditModal(false);
      setEditingCourse(null);
      console.log('Course updated successfully');
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Error updating course: ' + error.message);
    }
  };

  const pendingCourses = courses.filter(course => !course.approved);
  const approvedCourses = courses.filter(course => course.approved);

  const getStatusBadge = (approved) => {
    if (approved) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Approved</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Course Management</h1>
          <p className="text-gray-600">Manage all courses - approve, reject, add, edit, or delete courses.</p>
        </div>
        <button 
          onClick={() => setShowAddCourse(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="text-2xl font-bold text-gray-900">{courses.length}</div>
          <div className="text-sm text-gray-600">Total Courses</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="text-2xl font-bold text-gray-900">{pendingCourses.length}</div>
          <div className="text-sm text-gray-600">Pending Approval</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="text-2xl font-bold text-gray-900">{approvedCourses.length}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="text-2xl font-bold text-gray-900">
            {courses.filter(c => c.lessons && c.lessons.length > 0).length}
          </div>
          <div className="text-sm text-gray-600">With Lessons</div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {/* Course Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white line-clamp-2">{course.title}</h3>
                <p className="text-indigo-100 text-sm mt-1">
                  By {course.instructorName || 'Unknown Instructor'}
                </p>
              </div>
              {getStatusBadge(course.approved)}
            </div>

            {/* Course Content */}
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">Lessons</div>
                  <div className="text-sm font-medium text-gray-900">
                    {course.lessons ? course.lessons.length : 0}
                  </div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">Created</div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatDate(course.createdAt)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {!course.approved && (
                  <>
                    <button
                      onClick={() => handleApprove(course.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-1 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(course.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-1 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Reject</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-1 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-1 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Courses Found</h3>
          <p className="text-gray-600">Get started by adding your first course.</p>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Add New Course</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  placeholder="Enter course description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={newCourse.coverImageUrl}
                  onChange={(e) => setNewCourse({...newCourse, coverImageUrl: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddCourse}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Add Course
              </button>
              <button
                onClick={() => setShowAddCourse(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditModal && editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Edit Course</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  value={editCourseData.title}
                  onChange={(e) => setEditCourseData({...editCourseData, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  placeholder="Enter course description"
                  value={editCourseData.description}
                  onChange={(e) => setEditCourseData({...editCourseData, description: e.target.value})}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={editCourseData.coverImageUrl}
                  onChange={(e) => setEditCourseData({...editCourseData, coverImageUrl: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpdateCourse}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Update Course
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCourse(null);
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}