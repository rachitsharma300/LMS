package com.lms.backend.config;

import com.lms.backend.model.*;
import com.lms.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Starting Data Seeding...");

        try {
            // 1. Create Roles (Always check if exists)
            createRoles();

            // 2. Create Categories (Only if not exists)
            createCategories();

            // 3. Create Default Users (Only if not exists)
            createDefaultUsers();

            // 4. Create Sample Courses & Lessons (Only if no courses exist)
            createSampleCourses();

            // 5. Create Sample Enrollments (Only if no enrollments exist)
            createSampleEnrollments();

            System.out.println("Data Seeding Completed Successfully!");

        } catch (Exception e) {
            System.err.println("Data Seeding Failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void createRoles() {
        try {
            if (roleRepository.count() == 0) {
                List<Role> roles = Arrays.asList(
                        Role.builder().name(Role.RoleName.ROLE_ADMIN).build(),
                        Role.builder().name(Role.RoleName.ROLE_INSTRUCTOR).build(),
                        Role.builder().name(Role.RoleName.ROLE_STUDENT).build()
                );

                roleRepository.saveAll(roles);
                System.out.println("Default roles created: ADMIN, INSTRUCTOR, STUDENT");
            } else {
                System.out.println("Roles already exist in database");
            }
        } catch (Exception e) {
            System.err.println("Error creating roles: " + e.getMessage());
            throw e;
        }
    }

    private void createCategories() {
        try {
            if (categoryRepository.count() == 0) {
                List<Category> categories = Arrays.asList(
                        Category.builder().name("Programming").description("Programming languages and coding courses").build(),
                        Category.builder().name("Web Development").description("Frontend and backend web development").build(),
                        Category.builder().name("Data Science").description("Data analysis, ML and AI courses").build(),
                        Category.builder().name("Mobile Development").description("Android and iOS app development").build(),
                        Category.builder().name("Cloud Computing").description("AWS, Azure, GCP cloud courses").build(),
                        Category.builder().name("DevOps").description("CI/CD, Docker, Kubernetes courses").build(),
                        Category.builder().name("Design").description("UI/UX design and graphics courses").build(),
                        Category.builder().name("Business").description("Business and management courses").build()
                );
                categoryRepository.saveAll(categories);
                System.out.println("Default categories created: " + categories.size() + " categories");
            } else {
                System.out.println("Categories already exist in database");
            }
        } catch (Exception e) {
            System.err.println("Error creating categories: " + e.getMessage());
            throw e;
        }
    }

    private void createDefaultUsers() {
        try {
            int usersCreated = 0;

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
                usersCreated++;
                System.out.println("Admin user created: admin@lms.com / admin123");
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
                usersCreated++;
                System.out.println("Instructor user created: instructor@lms.com / instructor123");
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
                usersCreated++;
                System.out.println("Student user created: student@lms.com / student123");
            }

            // Additional Students (Simple check - create if email doesn't exist)
            createAdditionalStudents();

            if (usersCreated == 0) {
                System.out.println("All default users already exist");
            }

        } catch (Exception e) {
            System.err.println("Error creating users: " + e.getMessage());
            throw e;
        }
    }

    private void createAdditionalStudents() {
        try {
            Role studentRole = roleRepository.findByName(Role.RoleName.ROLE_STUDENT)
                    .orElseThrow(() -> new RuntimeException("Student role not found"));

            List<User> additionalStudents = Arrays.asList(
                    User.builder()
                            .username("Mike Johnson")
                            .email("mike@lms.com")
                            .password(passwordEncoder.encode("student123"))
                            .role(studentRole)
                            .build(),
                    User.builder()
                            .username("Emma Wilson")
                            .email("emma@lms.com")
                            .password(passwordEncoder.encode("student123"))
                            .role(studentRole)
                            .build(),
                    User.builder()
                            .username("Alex Chen")
                            .email("alex@lms.com")
                            .password(passwordEncoder.encode("student123"))
                            .role(studentRole)
                            .build(),
                    User.builder()
                            .username("Sarah Miller")
                            .email("sarah@lms.com")
                            .password(passwordEncoder.encode("student123"))
                            .role(studentRole)
                            .build()
            );

            // Save only if email doesn't exist
            for (User student : additionalStudents) {
                if (!userRepository.existsByEmail(student.getEmail())) {
                    userRepository.save(student);
                    System.out.println("Additional student created: " + student.getEmail());
                }
            }
        } catch (Exception e) {
            System.err.println("Error creating additional students: " + e.getMessage());
        }
    }

    private void createSampleCourses() {
        try {
            if (courseRepository.count() == 0) {
                // Get instructor
                User instructor = userRepository.findByEmail("instructor@lms.com")
                        .orElseThrow(() -> new RuntimeException("Instructor not found"));

                // Get categories
                Category programmingCategory = categoryRepository.findByName("Programming")
                        .orElseThrow(() -> new RuntimeException("Programming category not found"));
                Category webCategory = categoryRepository.findByName("Web Development")
                        .orElseThrow(() -> new RuntimeException("Web Development category not found"));
                Category dataScienceCategory = categoryRepository.findByName("Data Science")
                        .orElseThrow(() -> new RuntimeException("Data Science category not found"));
                Category mobileCategory = categoryRepository.findByName("Mobile Development")
                        .orElseThrow(() -> new RuntimeException("Mobile Development category not found"));
                Category cloudCategory = categoryRepository.findByName("Cloud Computing")
                        .orElseThrow(() -> new RuntimeException("Cloud Computing category not found"));

                // Course 1: Java Programming
                Course javaCourse = Course.builder()
                        .title("Java Programming Masterclass")
                        .description("Learn Java programming from beginner to advanced level. Covering OOP, Collections, Multithreading and Spring Framework.")
                        .coverImageUrl("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop")
                        .instructor(instructor)
                        .category(programmingCategory)
                        .approved(true)
                        .price(12999.0)
                        .level("BEGINNER")
                        .rating(4.8)
                        .totalStudents(3247)
                        .duration("45 hours")
                        .build();
                Course savedJavaCourse = courseRepository.save(javaCourse);

                // Lessons for Java Course
                List<Lesson> javaLessons = Arrays.asList(
                        Lesson.builder().title("Introduction to Java").content("Learn what is Java, its history, features and why it is so popular.").durationSeconds(1800).position(1).course(savedJavaCourse).build(),
                        Lesson.builder().title("Java Development Setup").content("Install JDK, setup IDE and write your first Hello World program.").durationSeconds(2400).position(2).course(savedJavaCourse).build(),
                        Lesson.builder().title("Variables and Data Types").content("Understanding variables, primitive data types and type casting in Java.").durationSeconds(2100).position(3).course(savedJavaCourse).build(),
                        Lesson.builder().title("Object Oriented Programming").content("Classes, Objects, Constructors, Methods and this keyword.").durationSeconds(3300).position(4).course(savedJavaCourse).build(),
                        Lesson.builder().title("Inheritance and Polymorphism").content("Understanding inheritance, method overriding and polymorphism concepts.").durationSeconds(3000).position(5).course(savedJavaCourse).build()
                );
                lessonRepository.saveAll(javaLessons);

                // Course 2: React.js
                Course reactCourse = Course.builder()
                        .title("React.js Complete Guide 2024")
                        .description("Master React.js with Hooks, Context API, Redux, and build real-world applications with modern practices.")
                        .coverImageUrl("https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop")
                        .instructor(instructor)
                        .category(webCategory)
                        .approved(true)
                        .price(14999.0)
                        .level("INTERMEDIATE")
                        .rating(4.7)
                        .totalStudents(2876)
                        .duration("35 hours")
                        .build();
                Course savedReactCourse = courseRepository.save(reactCourse);

                // Lessons for React Course
                List<Lesson> reactLessons = Arrays.asList(
                        Lesson.builder().title("React Introduction").content("What is React, Virtual DOM, and why use React for web development.").durationSeconds(1600).position(1).course(savedReactCourse).build(),
                        Lesson.builder().title("JSX Syntax").content("Learn JSX syntax, expressions, and differences from HTML.").durationSeconds(2000).position(2).course(savedReactCourse).build(),
                        Lesson.builder().title("Components and Props").content("Functional components, class components and passing props.").durationSeconds(2800).position(3).course(savedReactCourse).build(),
                        Lesson.builder().title("State and Events").content("Understanding useState hook and handling events in React.").durationSeconds(3200).position(4).course(savedReactCourse).build()
                );
                lessonRepository.saveAll(reactLessons);

                // Course 3: Python Data Science (Pending Approval)
                Course pythonCourse = Course.builder()
                        .title("Python for Data Science")
                        .description("Complete Python course for data analysis, machine learning, and AI with Pandas, NumPy, and Scikit-learn.")
                        .coverImageUrl("https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=250&fit=crop")
                        .instructor(instructor)
                        .category(dataScienceCategory)
                        .approved(false)
                        .price(15999.0)
                        .level("BEGINNER")
                        .rating(4.6)
                        .totalStudents(2156)
                        .duration("50 hours")
                        .build();
                courseRepository.save(pythonCourse);

                // Course 4: Full Stack Web Development
                Course webCourse = Course.builder()
                        .title("Full Stack Web Development")
                        .description("Become a full-stack developer with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.")
                        .coverImageUrl("https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop")
                        .instructor(instructor)
                        .category(webCategory)
                        .approved(true)
                        .price(19999.0)
                        .level("BEGINNER")
                        .rating(4.5)
                        .totalStudents(1890)
                        .duration("60 hours")
                        .build();
                courseRepository.save(webCourse);

                // Course 5: Flutter Mobile Development
                Course flutterCourse = Course.builder()
                        .title("Flutter Mobile Development")
                        .description("Build beautiful native apps for iOS and Android with single codebase using Flutter and Dart.")
                        .coverImageUrl("https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop")
                        .instructor(instructor)
                        .category(mobileCategory)
                        .approved(true)
                        .price(10999.0)
                        .level("INTERMEDIATE")
                        .rating(4.6)
                        .totalStudents(1567)
                        .duration("40 hours")
                        .build();
                courseRepository.save(flutterCourse);

                // Course 6: AWS Cloud Practitioner
                Course awsCourse = Course.builder()
                        .title("AWS Cloud Practitioner")
                        .description("Master AWS fundamentals and prepare for certification. EC2, S3, RDS, Lambda with hands-on labs.")
                        .coverImageUrl("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop")
                        .instructor(instructor)
                        .category(cloudCategory)
                        .approved(true)
                        .price(8999.0)
                        .level("BEGINNER")
                        .rating(4.8)
                        .totalStudents(3421)
                        .duration("30 hours")
                        .build();
                courseRepository.save(awsCourse);

                System.out.println("Sample courses created: 6 courses with lessons");
                System.out.println("   - Java Programming (5 lessons, Approved)");
                System.out.println("   - React.js (4 lessons, Approved)");
                System.out.println("   - Python Data Science (Pending Approval)");
                System.out.println("   - Full Stack Web Development (Approved)");
                System.out.println("   - Flutter Mobile Development (Approved)");
                System.out.println("   - AWS Cloud Practitioner (Approved)");

            } else {
                System.out.println("Courses already exist in database");
            }
        } catch (Exception e) {
            System.err.println("Error creating courses: " + e.getMessage());
            throw e;
        }
    }

    private void createSampleEnrollments() {
        try {
            if (enrollmentRepository.count() == 0) {
                // Get all courses
                List<Course> allCourses = courseRepository.findAll();

                // Get students by email
                Optional<User> student = userRepository.findByEmail("student@lms.com");
                Optional<User> mike = userRepository.findByEmail("mike@lms.com");
                Optional<User> emma = userRepository.findByEmail("emma@lms.com");
                Optional<User> alex = userRepository.findByEmail("alex@lms.com");
                Optional<User> sarah = userRepository.findByEmail("sarah@lms.com");

                // Find courses by title
                Course javaCourse = findCourseByTitle(allCourses, "Java Programming Masterclass");
                Course reactCourse = findCourseByTitle(allCourses, "React.js Complete Guide 2024");
                Course webCourse = findCourseByTitle(allCourses, "Full Stack Web Development");
                Course flutterCourse = findCourseByTitle(allCourses, "Flutter Mobile Development");
                Course awsCourse = findCourseByTitle(allCourses, "AWS Cloud Practitioner");

                int enrollmentsCreated = 0;

                // Create enrollments only if both student and course exist
                if (student.isPresent() && javaCourse != null) {
                    enrollmentRepository.save(Enrollment.builder()
                            .student(student.get()).course(javaCourse).progress(25.50).build());
                    enrollmentsCreated++;
                }

                if (student.isPresent() && reactCourse != null) {
                    enrollmentRepository.save(Enrollment.builder()
                            .student(student.get()).course(reactCourse).progress(60.00).build());
                    enrollmentsCreated++;
                }

                if (mike.isPresent() && javaCourse != null) {
                    enrollmentRepository.save(Enrollment.builder()
                            .student(mike.get()).course(javaCourse).progress(80.00).build());
                    enrollmentsCreated++;
                }

                if (mike.isPresent() && webCourse != null) {
                    enrollmentRepository.save(Enrollment.builder()
                            .student(mike.get()).course(webCourse).progress(45.00).build());
                    enrollmentsCreated++;
                }

                if (emma.isPresent() && reactCourse != null) {
                    enrollmentRepository.save(Enrollment.builder()
                            .student(emma.get()).course(reactCourse).progress(15.00).build());
                    enrollmentsCreated++;
                }

                if (alex.isPresent() && flutterCourse != null) {
                    enrollmentRepository.save(Enrollment.builder()
                            .student(alex.get()).course(flutterCourse).progress(70.00).build());
                    enrollmentsCreated++;
                }

                if (sarah.isPresent() && awsCourse != null) {
                    enrollmentRepository.save(Enrollment.builder()
                            .student(sarah.get()).course(awsCourse).progress(90.00).build());
                    enrollmentsCreated++;
                }

                System.out.println("✅ " + enrollmentsCreated + " sample enrollments created");

            } else {
                System.out.println("✅ Enrollments already exist in database");
            }
        } catch (Exception e) {
            System.err.println("Error creating enrollments: " + e.getMessage());
            // Don't throw exception for enrollments - they're optional
        }
    }

    // Helper method to find course by title
    private Course findCourseByTitle(List<Course> courses, String title) {
        return courses.stream()
                .filter(course -> course.getTitle().equals(title))
                .findFirst()
                .orElse(null);
    }
}