import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';
  
  currentUser: any = null;

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('user');
    if (saved) this.currentUser = JSON.parse(saved);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((user: any) => {
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }
}