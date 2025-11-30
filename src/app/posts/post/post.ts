import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PostComment } from '../../comment/post-comment/post-comment/post-comment';
import { PostResponse } from '../model/post-response.model';


@Component({
  selector: 'app-post',
  imports: [DatePipe, MatCardContent, MatCard, MatCardContent, MatCardTitle, MatCardHeader, MatIcon, MatCardSubtitle, MatCardActions],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post implements OnInit {

  currentMode: 'admin' | 'user-all' | 'user-mine' = 'admin';

  posts: PostResponse[] = [];

  page = 0;
  size = 3;
  totalPages = 0;
  status: string | null = null;
  viewMode: 'table' | 'card' = 'card';

  private postService = inject(PostService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.status = params.get('status') || null;

      if (this.router.url.startsWith('/admin')) {
        this.currentMode = 'admin';
      }
      else if (this.router.url.startsWith('/user/my-posts')) {
        this.currentMode = 'user-mine';
      }
      else {
        this.currentMode = 'user-all';
      }

      this.loadPosts();
    });
  }

  get headerTitle(): string {
    if (this.currentMode === 'admin') {
      return this.status
        ? `All - Posts (${this.status})`
        : 'All Posts';
    }

    if (this.currentMode === 'user-mine') {
      return this.status
        ? `My Posts (${this.status})`
        : 'My Posts';
    }

    if (this.currentMode === 'user-all') {
      return this.status
        ? `Posts (${this.status})`
        : 'All Posts';
    }

    return 'Posts';
  }


  loadPosts() {

    // ADMIN MODE
    if (this.currentMode === 'admin') {
      if (this.status) {
        this.postService.getPostsByStatus(this.status, this.page, this.size)
          .subscribe(this.handleResponse.bind(this));
      } else {
        this.postService.getPosts(this.page, this.size)
          .subscribe(this.handleResponse.bind(this));
      }
      return;
    }

    // USER - MY POSTS
    if (this.currentMode === 'user-mine') {
      if (this.status) {
        this.postService.getMyPostsByStatus(this.status, this.page, this.size)
          .subscribe(this.handleResponse.bind(this));
      } else {
        this.postService.getMyPosts(this.page, this.size)
          .subscribe(this.handleResponse.bind(this));
      }
      return;
    }

    // USER - ALL ALLOWED POSTS
    if (this.currentMode === 'user-all') {
      this.postService.getPosts(this.page, this.size)
        .subscribe(this.handleResponse.bind(this));
    }
  }

  handleResponse(res: any) {
    this.posts = res.data.content;
    this.totalPages = res.data.totalPages;
  }


  openDetails(id: number) {
    if (this.currentMode === 'admin') {
      this.router.navigate(['/admin/post', id]);
    } else {
      this.router.navigate(['/user/post', id]);
    }
  }

  openComments(postId: number): void {
    this.dialog.open(PostComment, {
      width: '500px',
      data: { postId }
    });
  }


  toggleView() {
    this.viewMode = this.viewMode === 'card' ? 'table' : 'card';
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadPosts();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadPosts();
    }
  }

}