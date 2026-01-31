import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BoardComponent } from './features/board/board.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'board/:id', component: BoardComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }

];