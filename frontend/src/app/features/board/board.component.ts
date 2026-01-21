import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, 
    MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  projectId: string = '';
  
  todoTickets: any[] = [];
  progressTickets: any[] = [];
  doneTickets: any[] = [];

  newTicket = {
    title: '',
    description: '',
    status: 'TODO',
    projectId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.newTicket.projectId = this.projectId;
    
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTicketsByProject(this.projectId).subscribe(data => {
      this.todoTickets = [];
      this.progressTickets = [];
      this.doneTickets = [];

      data.forEach(ticket => {
        if (ticket.status === 'TODO') this.todoTickets.push(ticket);
        else if (ticket.status === 'IN_PROGRESS') this.progressTickets.push(ticket);
        else if (ticket.status === 'DONE') this.doneTickets.push(ticket);
      });
    });
  }

addTicket() {
    if (!this.newTicket.title) return;
    this.ticketService.createTicket(this.newTicket).subscribe({
      next: (createdTicket) => {
        if (createdTicket.status === 'TODO') {
          this.todoTickets = [...this.todoTickets, createdTicket];
        } else if (createdTicket.status === 'IN_PROGRESS') {
          this.progressTickets = [...this.progressTickets, createdTicket];
        } else if (createdTicket.status === 'DONE') {
          this.doneTickets = [...this.doneTickets, createdTicket];
        }
        this.newTicket.title = '';
        this.newTicket.description = '';
      },
      error: () => alert('Error creating ticket')
    });
  }
}