package com.lms.backend.repository;

import com.lms.backend.model.Course;
import com.lms.backend.model.Lesson;
import com.lms.backend.model.LessonProgress;
import com.lms.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonProgressRepository extends JpaRepository<LessonProgress, Long> {
    Optional<LessonProgress> findByStudentAndLesson(User student, Lesson lesson);
    List<LessonProgress> findByStudentAndLesson_Course(User student, Course course);
    boolean existsByStudentAndLessonAndCompletedTrue(User student, Lesson lesson);
}
