package com.lms.backend.service;

import com.lms.backend.model.Course;
import com.lms.backend.model.Enrollment;
import com.lms.backend.model.User;
import java.util.List;

public interface StudentService {
    Enrollment enrollInCourse(User student, Course course);
    List<Course> getEnrolledCourses(User student);
}
