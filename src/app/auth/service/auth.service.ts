import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../../shared/model/api-resoponse.model';
import { RegisterRequest } from '../model/register-request.model';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../model/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private baseUrl = "http://localhost:8080/auth";
  private http = inject(HttpClient);


  login(credentials: { username: string; password: string }) {

    const authString = 'Basic ' + btoa(`${credentials.username}:${credentials.password}`);

    const headers = new HttpHeaders({
      'Authorization': authString
    });

    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(() => {
          localStorage.setItem('authToken', authString);
        })
      );
  }

  register(data: RegisterRequest) {
    const body = {
      ...data,
      roles: [
        { roleName: 'USER' }
      ]
    };

    return this.http.post<ApiResponse>(`${this.baseUrl}/register`, body);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isAdmin(): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes("ADMIN");
  }

  isUser(): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes("USER");
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
  }

}
