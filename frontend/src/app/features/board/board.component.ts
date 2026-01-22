import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
    CommonModule, FormsModule, DragDropModule,
    MatCardModule, MatButtonModule, MatInputModule, 
    MatFormFieldModule, MatSelectModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  projectId: string = '';
  todoTickets: any[] = [];
  progressTickets: any[] = [];
  doneTickets: any[] = [];

  newTicket = { title: '', description: '', status: 'TODO', projectId: '' };

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.newTicket.projectId = this.projectId;
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTicketsByProject(this.projectId).subscribe(data => {
      this.todoTickets = data.filter(t => t.status === 'TODO');
      this.progressTickets = data.filter(t => t.status === 'IN_PROGRESS');
      this.doneTickets = data.filter(t => t.status === 'DONE');
      this.cd.detectChanges();
    });
  }

  addTicket() {
    if (!this.newTicket.title) return;
this.ticketService.createTicket(this.newTicket).subscribe({
      next: (createdTicket) => {
        if (createdTicket.status === 'TODO') {
          this.todoTickets.push(createdTicket);
        } else if (createdTicket.status === 'IN_PROGRESS') {
          this.progressTickets.push(createdTicket);
        } else if (createdTicket.status === 'DONE') {
          this.doneTickets.push(createdTicket);
        }
        this.newTicket.title = '';
        this.newTicket.description = '';
        this.cd.detectChanges();
      },
      error: () => alert('Error')
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const ticket = event.container.data[event.currentIndex];
      
      let newStatus = 'TODO';
      if (event.container.id === 'progressList') newStatus = 'IN_PROGRESS';
      if (event.container.id === 'doneList') newStatus = 'DONE';

      this.ticketService.updateTicketStatus(ticket.id, newStatus).subscribe({
        error: (err) => console.error('Failed to update status', err)
      });
    }
  }
}