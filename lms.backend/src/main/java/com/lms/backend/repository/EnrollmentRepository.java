package com.lms.backend.repository;

import com.lms.backend.model.Course;
import com.lms.backend.model.Enrollment;
import com.lms.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByStudentAndCourse(User student, Course course);
    Optional<Enrollment> findByStudentAndCourse(User student, Course course);
    List<Enrollment> findByStudent(User student);

    @Query("SELECT e.course FROM Enrollment e WHERE e.student = :student")
    List<Course> findCoursesByStudent(User student);

    @Query("SELECT e FROM Enrollment e WHERE e.student = :student AND e.progress >= 100")
    List<Enrollment> findCompletedEnrollmentsByStudent(User student);

    @Query("SELECT e FROM Enrollment e WHERE e.student = :student AND e.progress > 0 AND e.progress < 100")
    List<Enrollment> findInProgressEnrollmentsByStudent(User student);
}