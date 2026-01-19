package com.jurekotnik.backend.dto;

import com.jurekotnik.backend.model.TicketStatus;
import lombok.Data;
import java.util.UUID;

@Data
public class TicketRequest {
    private String title;
    private String description;
    private TicketStatus status;
    private UUID projectId;
}