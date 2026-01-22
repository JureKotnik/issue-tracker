package com.jurekotnik.backend.controller;

import com.jurekotnik.backend.dto.TicketRequest;
import com.jurekotnik.backend.model.Project;
import com.jurekotnik.backend.model.Ticket;
import com.jurekotnik.backend.repository.ProjectRepository;
import com.jurekotnik.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:4200")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/project/{projectId}")
    public List<Ticket> getTicketsByProject(@PathVariable UUID projectId) {
        return ticketRepository.findByProjectId(projectId);
    }

    @PostMapping
    public Ticket createTicket(@RequestBody TicketRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setStatus(request.getStatus());
        ticket.setProject(project);

        return ticketRepository.save(ticket);
    }

    @PatchMapping("/{id}/status")
    public Ticket updateTicketStatus(@PathVariable UUID id, @RequestBody String newStatus) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(com.jurekotnik.backend.model.TicketStatus.valueOf(newStatus));
        
        return ticketRepository.save(ticket);
    }
}