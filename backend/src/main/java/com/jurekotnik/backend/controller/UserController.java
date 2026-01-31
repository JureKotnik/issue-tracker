package com.jurekotnik.backend.controller;

import com.jurekotnik.backend.dto.RegisterRequest;
import com.jurekotnik.backend.model.User;
import com.jurekotnik.backend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid@RequestBody RegisterRequest request) {
        User createdUser = userService.registerUser(request);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody RegisterRequest request) {
        User user = userService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(user);
    }
}