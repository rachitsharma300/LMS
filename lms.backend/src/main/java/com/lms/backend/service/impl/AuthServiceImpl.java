package com.lms.backend.service.impl;

import com.lms.backend.dto.SignupRequest;
import com.lms.backend.model.Role;
import com.lms.backend.model.User;
import com.lms.backend.repository.RoleRepository;
import com.lms.backend.repository.UserRepository;
import com.lms.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return null;
        }
        String email = auth.getName(); // CustomUserDetailsService uses email as username
        return userRepository.findByEmail(email).orElse(null);
    }
}
