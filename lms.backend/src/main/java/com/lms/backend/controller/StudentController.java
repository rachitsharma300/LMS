// StudentController.java - ENHANCED VERSION
package com.lms.backend.controller;

import com.lms.backend.model.Course;
import com.lms.backend.model.Enrollment;
import com.lms.backend.model.Lesson;
import com.lms.backend.model.User;
import com.lms.backend.service.AuthService;
import com.lms.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private AuthService authService;

    /**
     * 🎯 Enroll student in a course
     * Prevents duplicate enrollments
     */
    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<?> enrollCourse(@PathVariable Long courseId) {
        try {
            User currentUser = authService.getCurrentUser();
            studentService.enrollCourse(currentUser, courseId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "✅ Enrolled successfully in course",
                    "courseId", courseId
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    /**
     * 🎯 Get all enrolled courses for current student
     */
    @GetMapping("/my-courses")
    public ResponseEntity<List<Course>> getMyCourses() {
        User currentUser = authService.getCurrentUser();
        List<Course> enrolledCourses = studentService.getEnrolledCourses(currentUser);
        return ResponseEntity.ok(enrolledCourses);
    }

    /**
     * 🎯 Get course details with enrollment info
     */
    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getCourseWithProgress(@PathVariable Long courseId) {
        try {
            User currentUser = authService.getCurrentUser();
            Map<String, Object> courseWithProgress = studentService.getCourseWithProgress(currentUser, courseId);
            return ResponseEntity.ok(courseWithProgress);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * 🎯 Mark lesson as completed
     */
    @PostMapping("/course/{courseId}/lesson/{lessonId}/complete")
    public ResponseEntity<?> markLessonCompleted(
            @PathVariable Long courseId,
            @PathVariable Long lessonId) {
        try {
            User currentUser = authService.getCurrentUser();
            studentService.markLessonCompleted(currentUser, courseId, lessonId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "✅ Lesson marked as completed"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    /**
     * 🎯 Get student learning statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getLearningStats() {
        User currentUser = authService.getCurrentUser();
        Map<String, Object> stats = studentService.getLearningStats(currentUser);
        return ResponseEntity.ok(stats);
    }

    /**
     * 🎯 Get course progress
     */
    @GetMapping("/course/{courseId}/progress")
    public ResponseEntity<Map<String, Object>> getCourseProgress(@PathVariable Long courseId) {
        User currentUser = authService.getCurrentUser();
        Map<String, Object> progress = studentService.getCourseProgress(currentUser, courseId);
        return ResponseEntity.ok(progress);
    }

    /**
     * 🎯 Get available courses (not enrolled)
     */
    @GetMapping("/courses/available")
    public ResponseEntity<List<Course>> getAvailableCourses() {
        User currentUser = authService.getCurrentUser();
        List<Course> availableCourses = studentService.getAvailableCourses(currentUser);
        return ResponseEntity.ok(availableCourses);
    }
}