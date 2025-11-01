package com.lms.backend.service;

import com.lms.backend.dto.SignupRequest;
import com.lms.backend.model.User;

public interface AuthService {
    User registerUser(SignupRequest signupRequest);

    // Ye line add karo agar nahi hai 👇
    User getCurrentUser();
}
