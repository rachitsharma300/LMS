package com.lms.backend.controller;

import com.lms.backend.dto.CourseDto;
import com.lms.backend.model.Course;
import com.lms.backend.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructor")
@CrossOrigin(origins = "*")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @PostMapping("/courses")
    public Course createCourse(@RequestBody CourseDto courseDto) {
        return instructorService.createCourse(courseDto);
    }

    @GetMapping("/courses")
    public List<Course> getInstructorCourses(@RequestParam Long instructorId) {
        return instructorService.getCoursesByInstructor(instructorId);
    }

    @DeleteMapping("/courses/{id}")
    public String deleteCourse(@PathVariable Long id) {
        instructorService.deleteCourse(id);
        return "✅ Course deleted successfully.";
    }
}
