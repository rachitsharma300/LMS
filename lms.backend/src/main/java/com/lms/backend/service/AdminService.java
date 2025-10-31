package com.lms.backend.service;

import com.lms.backend.model.User;
import java.util.List;

public interface AdminService {

    List<User> getAllUsers();

    void deleteUser(Long userId);

    User updateUserRole(Long userId, String role);
}
