import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  user = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    console.log('Form Submitted', this.user);
    if (this.user.email && this.user.password) {
      this.authService.register(this.user).subscribe({
        // ⬇️ FIXED: Added ': any' to satisfy strict mode
        next: (val: any) => {
          alert('Success! User registered.');
          console.log(val);
        },
        error: (err: any) => {
          alert('Error registering user.');
          console.error(err);
        }
      });
    }
  }
}