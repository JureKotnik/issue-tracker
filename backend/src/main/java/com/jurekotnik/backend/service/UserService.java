package com.jurekotnik.backend.service;

import com.jurekotnik.backend.dto.RegisterRequest;
import com.jurekotnik.backend.model.User;
import com.jurekotnik.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already taken");
        }

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setFullName(request.getFullName());
        newUser.setPassword(request.getPassword());

        return userRepository.save(newUser);
    }
}