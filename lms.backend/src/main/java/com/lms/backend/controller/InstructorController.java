package com.lms.backend.controller;

import com.lms.backend.dto.CourseDto;
import com.lms.backend.model.Course;
import com.lms.backend.model.User;
import com.lms.backend.service.InstructorService;
import com.lms.backend.service.UserService;
import com.lms.backend.util.CourseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/instructor")
@CrossOrigin(origins = "*")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private UserService userService;

    @PostMapping("/courses")
    public CourseDto createCourse(@RequestBody CourseDto courseDto) {
        User instructor = userService.getUserById(courseDto.getInstructorId());
        Course course = CourseMapper.toEntity(courseDto, instructor);
        Course saved = instructorService.createCourse(course, instructor.getId());
        return CourseMapper.toDto(saved);
    }

    @GetMapping("/{instructorId}/courses")
    public List<CourseDto> getInstructorCourses(@PathVariable Long instructorId) {
        List<Course> courses = instructorService.getCoursesByInstructor(instructorId);
        return courses.stream().map(CourseMapper::toDto).collect(Collectors.toList());
    }

    @DeleteMapping("/courses/{id}")
    public String deleteCourse(@PathVariable Long id) {
        instructorService.deleteCourse(id);
        return "Course deleted successfully";
    }
}
