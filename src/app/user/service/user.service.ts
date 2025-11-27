import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/model/api-resoponse.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  http = inject(HttpClient);

  getUsers(page: number, size: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  //getcoutof users
  getCountTotalUsers(): Observable<{ totalUsers: number }> {
    return this.http.get<{ totalUsers: number }>(`${this.baseUrl}/total`);
  }

  getUserStatusSummary(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/status-summary`);
  }

}
