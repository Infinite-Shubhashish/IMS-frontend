import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../service/service';
import { ActivatedRoute } from '@angular/router';
import { PostResponse } from '../model/postResponse.interface';
import { DatePipe } from '@angular/common';
import { Authservice } from '../../auth/authservice';

@Component({
  selector: 'app-post-detail',
  imports: [DatePipe],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail implements OnInit {

  post: PostResponse | null = null;
  errorMessage: string | null = null;
  isAdmin: boolean = false;

  private http = inject(HttpClient);
  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private authService = inject(Authservice);

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchPostDetails(id);
  }

  fetchPostDetails(id: any) {
    this.postService.getPostById(id).subscribe({
      next: (res) => {
        this.post = res.data ?? null;
      },
      error: (error) => {
        this.errorMessage = error.error.message + " : " + error.error.code || 'Failed to fetch post details';
      }
    });
  }

  approvePost() {
    if (!this.post) return;
    this.postService.approvePost(this.post.id).subscribe({
      next: (res) => {
        this.post = res.data ?? null;
        setTimeout(() => {
          this.ngOnInit();
        }, 1000); // Refresh the post details
      },
      error: (error) => {
        this.errorMessage = error.error.message + " : " + error.error.code || 'Failed to approve post';
      }
    });
  }

  closePost() {
    if (!this.post) return;
    this.postService.closePost(this.post.id).subscribe({
      next: (res) => {
        this.post = res.data ?? null;
        setTimeout(() => {
          this.ngOnInit();
        }, 1000); // Refresh the post details
      },
      error: (error) => {
        this.errorMessage = error.error.message + " : " + error.error.code || 'Failed to close post';
      }
    });
  }

  rejectPost() {
    if (!this.post) return;
    this.postService.rejectPost(this.post.id).subscribe({
      next: (res) => {
        this.post = res.data ?? null;
        setTimeout(() => {
          this.ngOnInit();
        }, 1000); // Refresh the post details
      },
      error: (error) => {
        this.errorMessage = error.error.message + " : " + error.error.code || 'Failed to reject post';
      }
    }
    );
  }
}