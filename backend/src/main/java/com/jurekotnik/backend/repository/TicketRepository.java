package com.jurekotnik.backend.repository;

import com.jurekotnik.backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {
    List<Ticket> findByProjectId(UUID projectId);
}