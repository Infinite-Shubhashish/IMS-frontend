import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Authservice } from '../../auth/service/auth.service';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { PostService } from '../../posts/service/post.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {
  private auth = inject(Authservice);
  private postService = inject(PostService);
  private router = inject(Router);

  totalPosts: number = 0;
  statusStats: Record<string, number> = {};

  ngOnInit() {
    this.loadStats();
    this.loadStatusStats();
  }

  loadStats() {
    this.postService.getCountMyTotalPosts().subscribe({
      next: (data) => {
        this.totalPosts = data.totalPosts;
      },
      error: (error) => {
        console.error('Error fetching total posts:', error);
      }
    });
  }

  loadStatusStats() {
    this.postService.getCountMyTotalPostsStatus().subscribe({
      next: (data) => {
        this.statusStats = data;
      },
      error: (err) => {
        console.error('Error fetching status stats:', err.error.message || 'Failed to fetch status stats');
      }
    });
  }

  openStatusPage(status: string) {
    this.router.navigate(['/user/my-posts/status', status]);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
