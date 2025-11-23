import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../auth/model/api-resoponse.model';
import { Post } from '../post/post';
import { PostResponse } from '../model/postResponse.interface';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';

  http = inject(HttpClient);

  getCountTotalPosts(): Observable<{ totalPosts: number }> {
    return this.http.get<{ totalPosts: number }>(`${this.baseUrl}/total`);
  }

  getCountTotalPostsStatus(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/stats/status`);
  }

  getPosts(page: number, size: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getPostById(id: number): Observable<ApiResponse<PostResponse>> {
    return this.http.get<ApiResponse<PostResponse>>(`${this.baseUrl}/${id}`);
  }

  approvePost(id: number): Observable<ApiResponse<PostResponse>> {
    return this.http.post<ApiResponse<PostResponse>>(`${this.baseUrl}/${id}/approve`, {});
  }

  rejectPost(id: number) {
    return this.http.post<ApiResponse>(`${this.baseUrl}/${id}/reject`, {});
  }

  closePost(id: number) {
    return this.http.post<ApiResponse>(`${this.baseUrl}/${id}/close`, {});
  }
}
