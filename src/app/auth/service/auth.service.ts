import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../../shared/model/api-resoponse.model';
import { RegisterRequest } from '../model/register-request.model';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../model/login-response.model';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private baseUrl = "http://localhost:8080/auth";
  private http = inject(HttpClient);

  private payload: TokenPayload | null = null;

  constructor() {
    this.loadPayload();
  }

  private loadPayload() {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      this.payload = jwtDecode<TokenPayload>(token);
    } catch {
      this.payload = null;
    }
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap((res) => {
          const token = res.data?.token || '';
          const roles = res.data?.roles || [];

          localStorage.setItem('token', token);
          localStorage.setItem('roles', JSON.stringify(roles));

          this.payload = jwtDecode<TokenPayload>(token);

          localStorage.setItem("username", this.payload.sub);
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
    if (!this.payload) return false;
    return this.payload.exp * 1000 > Date.now();
  }

  isAdmin(): boolean {
    return JSON.parse(localStorage.getItem("roles") || "[]").includes("ADMIN");
  }

  isUser(): boolean {
    return JSON.parse(localStorage.getItem("roles") || "[]").includes("USER");
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  get token(): string | null {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.clear();
    this.payload = null;
  }

}
