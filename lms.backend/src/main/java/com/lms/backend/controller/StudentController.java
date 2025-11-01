package com.lms.backend.controller;

import com.lms.backend.model.Course;
import com.lms.backend.model.User;
import com.lms.backend.service.AuthService;
import com.lms.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private AuthService authService;

    @PostMapping("/enroll/{courseId}")
    public String enrollCourse(@PathVariable Long courseId) {
        User currentUser = authService.getCurrentUser();
        studentService.enrollCourse(currentUser, courseId);
        return "✅ Enrolled successfully in course ID: " + courseId;
    }

    @GetMapping("/my-courses")
    public List<Course> getMyCourses() {
        User currentUser = authService.getCurrentUser();
        return studentService.getEnrolledCourses(currentUser);
    }
}
