import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'register', pathMatch: 'full' }
];