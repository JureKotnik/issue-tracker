package com.jurekotnik.backend.controller;

import com.jurekotnik.backend.model.Project;
import com.jurekotnik.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    @Autowired
    private com.jurekotnik.backend.repository.UserRepository userRepository;

    @PostMapping
    public Project createProject(@RequestBody Project project, @RequestParam java.util.UUID userId) {
        com.jurekotnik.backend.model.User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        project.setOwner(user);
        return projectRepository.save(project);
    }
}