package com.lms.backend.service;

import com.lms.backend.dto.LoginRequest;
import com.lms.backend.dto.SignupRequest;
import com.lms.backend.model.User;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> registerUser(SignupRequest signupRequest);
    ResponseEntity<?> loginUser(LoginRequest loginRequest);
    User getCurrentUser();
}
