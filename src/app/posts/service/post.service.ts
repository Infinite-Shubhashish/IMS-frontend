import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/model/api-resoponse.model';
import { PostResponse } from '../model/post-response.model';
import { PostRequest } from '../model/post-request.model';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';

  http = inject(HttpClient);

  createPost(postRequest: PostRequest): Observable<ApiResponse<PostResponse>> {
    return this.http.post<ApiResponse<PostResponse>>(`${this.baseUrl}`, postRequest);
  }

  updatePost(postId: number, postRequest: PostRequest): Observable<ApiResponse<PostResponse>> {
    return this.http.put<ApiResponse<PostResponse>>(`${this.baseUrl}/${postId}`, postRequest);
  }


  //for admin dashboard
  getCountTotalPosts(): Observable<{ totalPosts: number }> {
    return this.http.get<{ totalPosts: number }>(`${this.baseUrl}/total`);
  }

  getCountTotalPostsStatus(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/stats/status`);
  }

  getPosts(page: number, size: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getPostsByStatus(status: string, page: number, size: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/status?value=${status}&page=${page}&size=${size}`);
  }

  getPostById(id: number): Observable<ApiResponse<PostResponse>> {
    return this.http.get<ApiResponse<PostResponse>>(`${this.baseUrl}/${id}`);
  }

  submitForApproval(id: number): Observable<ApiResponse<PostResponse>> {
    return this.http.post<ApiResponse<PostResponse>>(`${this.baseUrl}/${id}/submit`, {});
  }

  approvePost(id: number): Observable<ApiResponse<PostResponse>> {
    return this.http.post<ApiResponse<PostResponse>>(`${this.baseUrl}/${id}/approve`, {});
  }

  rejectPost(id: number, comment: string): Observable<ApiResponse<PostResponse>> {
    return this.http.post<ApiResponse<PostResponse>>(`${this.baseUrl}/${id}/reject`, { adminComment: comment });
  }

  closePost(id: number, comment?: string): Observable<ApiResponse<PostResponse>> {
    return this.http.post<ApiResponse<PostResponse>>(`${this.baseUrl}/${id}/close`, { adminComment: comment });
  }

  // for user dashboard
  getCountMyTotalPosts(): Observable<{ totalPosts: number }> {
    return this.http.get<{ totalPosts: number }>(`${this.baseUrl}/me/total`);
  }

  getCountMyTotalPostsStatus(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/me/stats/status`);
  }

  getMyPosts(page: number, size: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/me?page=${page}&size=${size}`);
  }

  getMyPostsByStatus(status: string, page: number, size: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/me/status?value=${status}&page=${page}&size=${size}`);
  }
}
