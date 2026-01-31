import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register';
import { LoginComponent } from './features/auth/login/login.component'; 
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BoardComponent } from './features/board/board.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { 
      path: 'dashboard', 
      component: DashboardComponent, 
      canActivate: [authGuard] 
    },
    { 
      path: 'board/:id', 
      component: BoardComponent, 
      canActivate: [authGuard] 
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' }
];