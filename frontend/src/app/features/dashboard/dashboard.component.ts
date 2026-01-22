import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  newProject = { name: '', description: '' };

  constructor(
    private projectService: ProjectService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      this.cd.detectChanges();
    });
  }

  addProject() {
    if (!this.newProject.name) return;

    this.projectService.createProject(this.newProject).subscribe({
      next: (project) => {
        this.projects.push(project); 
        this.newProject = { name: '', description: '' };
        this.cd.detectChanges(); 
      },
      error: (err) => alert('Failed to create project')
    });
  }
}