// StudentService.java - COMPLETE INTERFACE
package com.lms.backend.service;

import com.lms.backend.model.Course;
import com.lms.backend.model.User;

import java.util.List;
import java.util.Map;

public interface StudentService {

    // 🎯 Basic enrollment methods
    void enrollCourse(User student, Long courseId);
    List<Course> getEnrolledCourses(User student);

    // 🎯 Progress tracking methods
    Map<String, Object> getCourseWithProgress(User student, Long courseId);
    void markLessonCompleted(User student, Long courseId, Long lessonId);
    Map<String, Object> getLearningStats(User student);
    Map<String, Object> getCourseProgress(User student, Long courseId);

    // 🎯 Course discovery methods
    List<Course> getAvailableCourses(User student);
}