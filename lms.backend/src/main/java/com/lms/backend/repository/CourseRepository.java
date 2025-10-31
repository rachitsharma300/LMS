package com.lms.backend.repository;


import com.lms.backend.model.Course;
import com.lms.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructor(User instructor);
    List<Course> findByApproved(boolean approved);
}
