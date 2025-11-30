import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentResponse } from '../../model/comment-response.model';
import { CommentRequest } from '../../model/comment-request.model';
import { Authservice } from '../../../auth/service/auth.service';
import { CommentService } from '../../service/comment.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-post-comment',
  imports: [MatIcon, DatePipe, MatFormField, CommonModule, FormsModule, MatInput],
  templateUrl: './post-comment.html',
  styleUrl: './post-comment.css',
})
export class PostComment implements OnInit {
  comments: CommentResponse[] = [];
  newComment: string = '';
  loggedInUsername: string = '';


  private commentService = inject(CommentService);
  private auth = inject(Authservice);
  private dialogRef = inject(MatDialogRef<PostComment>);
  private data = inject(MAT_DIALOG_DATA) as { postId: number };

  ngOnInit(): void {
    this.loggedInUsername = this.auth.getUsername();
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getComments(this.data.postId).subscribe({
      next: (res) => {
        this.comments = res.data || [];
        console.log(this.comments);

      },
      error: (err) => console.error(err),

    });
  }

  addComment(): void {
    if (!this.newComment.trim()) return;

    this.commentService.addComment(this.data.postId, { content: this.newComment }).subscribe({
      next: (res) => {
        if (res.data)
          this.comments.push(res.data);
        this.newComment = '';
      },
      error: (err) => console.error(err)
    });
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => this.comments = this.comments.filter(c => c.id !== commentId),
      error: (err) => console.error(err)
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
