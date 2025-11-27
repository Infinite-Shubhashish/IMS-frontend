import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentResponse } from '../model/comment-response.model';
import { CommentRequest } from '../model/comment-request.model';
import { ApiResponse } from '../../shared/model/api-resoponse.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = 'http://localhost:8080/api/comments';

  private http = inject(HttpClient);

  getComments(postId: number): Observable<ApiResponse<CommentResponse[]>> {
    return this.http.get<ApiResponse<CommentResponse[]>>(`${this.baseUrl}/post/${postId}`);
  }

  addComment(postId: number, comment: CommentRequest): Observable<ApiResponse<CommentResponse>> {
    return this.http.post<ApiResponse<CommentResponse>>(`${this.baseUrl}/${postId}`, comment);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${commentId}`);
  }
}
