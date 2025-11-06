package com.lms.backend.config;

import com.lms.backend.model.*;
import com.lms.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🚀 Starting Data Seeding...");

        // 1. Create Roles
        createRoles();

        // 2. Create Default Users
        createDefaultUsers();

        // 3. Create Sample Courses (NEW ADDED)
        createSampleCourses();

        System.out.println("✅ Data Seeding Completed Successfully!");
    }

    private void createRoles() {
        if (roleRepository.count() == 0) {
            List<Role> roles = Arrays.asList(
                    Role.builder().name(Role.RoleName.ROLE_ADMIN).build(),
                    Role.builder().name(Role.RoleName.ROLE_INSTRUCTOR).build(),
                    Role.builder().name(Role.RoleName.ROLE_STUDENT).build()
            );

            roleRepository.saveAll(roles);
            System.out.println("✅ Default roles created: ADMIN, INSTRUCTOR, STUDENT");
        }
    }

    private void createDefaultUsers() {
        // Admin User
        if (!userRepository.existsByEmail("admin@lms.com")) {
            Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Admin role not found"));

            User admin = User.builder()
                    .username("Admin User")
                    .email("admin@lms.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(adminRole)
                    .build();
            userRepository.save(admin);
            System.out.println("✅ Admin user created: admin@lms.com / admin123");
        }

        // Instructor User
        if (!userRepository.existsByEmail("instructor@lms.com")) {
            Role instructorRole = roleRepository.findByName(Role.RoleName.ROLE_INSTRUCTOR)
                    .orElseThrow(() -> new RuntimeException("Instructor role not found"));

            User instructor = User.builder()
                    .username("Demo Instructor")
                    .email("instructor@lms.com")
                    .password(passwordEncoder.encode("instructor123"))
                    .role(instructorRole)
                    .build();
            userRepository.save(instructor);
            System.out.println("✅ Instructor user created: instructor@lms.com / instructor123");
        }

        // Student User
        if (!userRepository.existsByEmail("student@lms.com")) {
            Role studentRole = roleRepository.findByName(Role.RoleName.ROLE_STUDENT)
                    .orElseThrow(() -> new RuntimeException("Student role not found"));

            User student = User.builder()
                    .username("Demo Student")
                    .email("student@lms.com")
                    .password(passwordEncoder.encode("student123"))
                    .role(studentRole)
                    .build();
            userRepository.save(student);
            System.out.println("✅ Student user created: student@lms.com / student123");
        }
    }

    // 🎯 NEW METHOD - Sample Courses and Lessons
    private void createSampleCourses() {
        if (courseRepository.count() == 0) {
            // Get instructor
            User instructor = userRepository.findByEmail("instructor@lms.com")
                    .orElseThrow(() -> new RuntimeException("Instructor not found"));

            // Course 1: Java Programming
            Course javaCourse = Course.builder()
                    .title("Java Programming")
                    .description("Learn Java from basics to advanced level with hands-on projects")
                    .coverImageUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400")
                    .instructor(instructor)
                    .approved(true)
                    .price(0.0)
                    .build();
            Course savedJavaCourse = courseRepository.save(javaCourse);

            // Lessons for Java Course
            Lesson javaLesson1 = Lesson.builder()
                    .title("Introduction to Java")
                    .content("In this lesson, we will learn about Java basics, history, and setup development environment.")
                    .position(1)
                    .durationSeconds(1800)
                    .course(savedJavaCourse)
                    .build();

            Lesson javaLesson2 = Lesson.builder()
                    .title("Object Oriented Programming")
                    .content("Learn about Classes, Objects, Inheritance, Polymorphism, Encapsulation and Abstraction in Java.")
                    .position(2)
                    .durationSeconds(2400)
                    .course(savedJavaCourse)
                    .build();

            Lesson javaLesson3 = Lesson.builder()
                    .title("Java Collections Framework")
                    .content("Understanding List, Set, Map and other collection interfaces and implementations.")
                    .position(3)
                    .durationSeconds(2100)
                    .course(savedJavaCourse)
                    .build();

            lessonRepository.saveAll(Arrays.asList(javaLesson1, javaLesson2, javaLesson3));

            // Course 2: Spring Boot
            Course springCourse = Course.builder()
                    .title("Spring Boot Masterclass")
                    .description("Build modern web applications using Spring Boot and Microservices")
                    .coverImageUrl("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400")
                    .instructor(instructor)
                    .approved(true)
                    .price(0.0)
                    .build();
            Course savedSpringCourse = courseRepository.save(springCourse);

            // Lessons for Spring Course
            Lesson springLesson1 = Lesson.builder()
                    .title("Spring Boot Basics")
                    .content("Introduction to Spring Boot, auto-configuration, and starter dependencies.")
                    .position(1)
                    .durationSeconds(2000)
                    .course(savedSpringCourse)
                    .build();

            Lesson springLesson2 = Lesson.builder()
                    .title("REST API Development")
                    .content("Building RESTful web services with Spring Boot and Spring MVC.")
                    .position(2)
                    .durationSeconds(2700)
                    .course(savedSpringCourse)
                    .build();

            lessonRepository.saveAll(Arrays.asList(springLesson1, springLesson2));

            // Course 3: Web Development
            Course webCourse = Course.builder()
                    .title("Full Stack Web Development")
                    .description("Complete web development course with HTML, CSS, JavaScript and React")
                    .coverImageUrl("https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400")
                    .instructor(instructor)
                    .approved(true)
                    .price(0.0)
                    .build();
            courseRepository.save(webCourse);

            System.out.println("✅ Sample courses created: Java Programming, Spring Boot, Web Development");
            System.out.println("✅ Lessons added to courses");
        } else {
            System.out.println("✅ Courses already exist in database");
        }
    }
}