package com.lms.backend.service;

import com.lms.backend.model.Course;
import com.lms.backend.model.User;
import java.util.List;

public interface InstructorService {
    Course createCourse(Course course, User instructor);
    List<Course> getInstructorCourses(User instructor);
}
