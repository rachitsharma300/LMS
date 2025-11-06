package com.lms.backend.service.impl;

import com.lms.backend.dto.SignupRequest;
import com.lms.backend.model.Role;
import com.lms.backend.model.User;
import com.lms.backend.repository.RoleRepository;
import com.lms.backend.repository.UserRepository;
import com.lms.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        String r = signupRequest.getRole() != null ? signupRequest.getRole().toUpperCase() : "ROLE_STUDENT";
        Role.RoleName roleEnum;
        try {
            roleEnum = Role.RoleName.valueOf(r);
        } catch (IllegalArgumentException e) {
            roleEnum = Role.RoleName.ROLE_STUDENT;
        }

        Role role = roleRepository.findByName(roleEnum)
                .orElseThrow(() -> new RuntimeException("Invalid role"));

        User user = User.builder()
                .username(signupRequest.getUsername())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .role(role)
                .build();

        return userRepository.save(user);
    }

    @Override
    public User getCurrentUser() {
        return userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("No user found"));
    }
}