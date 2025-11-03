// src/services/courseService.js
import apiClient from "./apiClient";

export const getAllCourses = async () => {
  const { data } = await apiClient.get("/courses");
  return data;
};

export const getMyCourses = async () => {
  const { data } = await apiClient.get("/instructor/courses");
  return data;
};

export const getEnrolledCourses = async () => {
  const { data } = await apiClient.get("/student/courses");
  return data;
};

export const getCourseById = async (id) => {
  const { data } = await apiClient.get(`/courses/${id}`);
  return data;
};

export const createCourse = async (courseData) => {
  const { data } = await apiClient.post("/instructor/courses", courseData);
  return data;
};

export const enrollCourse = async (courseId) => {
  const { data } = await apiClient.post(`/student/enroll/${courseId}`);
  return data;
};
