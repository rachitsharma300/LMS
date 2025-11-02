package com.lms.backend.service;

import com.lms.backend.model.Course;
import com.lms.backend.model.User;

import java.util.List;

public interface StudentService {
    void enrollCourse(User student, Long courseId);
    List<Course> getEnrolledCourses(User student);
}
