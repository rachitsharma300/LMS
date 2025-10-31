package com.lms.backend.service.impl;

import com.lms.backend.model.Course;
import com.lms.backend.model.User;
import com.lms.backend.repository.CourseRepository;
import com.lms.backend.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorServiceImpl implements InstructorService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Course createCourse(Course course, User instructor) {
        course.setInstructor(instructor);
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getInstructorCourses(User instructor) {
        return courseRepository.findByInstructor(instructor);
    }
}
