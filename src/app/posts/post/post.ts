import { Component, inject, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PostService } from '../service/service';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-post',
  imports: [DatePipe, RouterLink],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post implements OnInit {

  posts: any[] = [];

  page = 0;
  size = 3;
  totalPages = 0;

  private postService = inject(PostService);
  private router = inject(Router);

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts(this.page, this.size).subscribe(res => {
      this.posts = res.data.content;
      this.totalPages = res.data.totalPages;
    });
  }

  openDetails(id: number) {
    this.router.navigate(['/admin/post', id]);
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