package com.lms.backend.config;

import com.lms.backend.model.Role;
import com.lms.backend.model.User;
import com.lms.backend.repository.RoleRepository;
import com.lms.backend.repository.UserRepository;
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
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🚀 Starting Data Seeding...");

        // 1. Create Roles
        createRoles();

        // 2. Create Default Users
        createDefaultUsers();

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
}