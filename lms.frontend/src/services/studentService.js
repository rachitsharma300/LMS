// services/studentService.js - COMPLETE API SERVICES
import api from './apiClient';

/**
 * 🎯 Student Service - Handles all student-related API calls
 */
const studentService = {
  
  /**
   * 🎯 Enroll in a course
   */
  async enrollCourse(courseId) {
    try {
      const response = await api.post(`/api/student/enroll/${courseId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to enroll in course');
    }
  },

  /**
   * 🎯 Get enrolled courses
   */
  async getEnrolledCourses() {
    try {
      const response = await api.get('/api/student/my-courses');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch enrolled courses');
    }
  },

  /**
   * 🎯 Get course details with progress
   */
  async getCourseWithProgress(courseId) {
    try {
      const response = await api.get(`/api/student/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch course details');
    }
  },

  /**
   * 🎯 Mark lesson as completed
   */
  async markLessonCompleted(courseId, lessonId) {
    try {
      const response = await api.post(`/api/student/course/${courseId}/lesson/${lessonId}/complete`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark lesson as completed');
    }
  },

  /**
   * 🎯 Get learning statistics
   */
  async getLearningStats() {
    try {
      const response = await api.get('/api/student/stats');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch learning statistics');
    }
  },

  /**
   * 🎯 Get course progress
   */
  async getCourseProgress(courseId) {
    try {
      const response = await api.get(`/api/student/course/${courseId}/progress`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch course progress');
    }
  },

  /**
   * 🎯 Get available courses (not enrolled)
   */
  async getAvailableCourses() {
    try {
      const response = await api.get('/api/student/courses/available');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch available courses');
    }
  },

  /**
   * 🎯 Search courses
   */
  async searchCourses(query) {
    try {
      const response = await api.get(`/api/courses/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to search courses');
    }
  }
};

export default studentService;