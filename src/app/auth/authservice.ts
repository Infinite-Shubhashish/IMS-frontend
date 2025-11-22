import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api-resoponse.model';
import { RegisterRequest } from './model/registerequest.interface';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private baseUrl = "http://localhost:8080/auth";
  private http = inject(HttpClient);


  login(credentials: { username: string; password: string }) {
    return this.http.post<ApiResponse>(`${this.baseUrl}/login`, credentials);
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

}
