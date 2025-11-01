package com.lms.backend.service;

import com.lms.backend.model.Course;
import java.util.List;

public interface InstructorService {
    Course createCourse(Course course, Long instructorId);
    List<Course> getCoursesByInstructor(Long instructorId);
    Course updateCourse(Long courseId, Course updatedCourse);
    void deleteCourse(Long courseId);
}
