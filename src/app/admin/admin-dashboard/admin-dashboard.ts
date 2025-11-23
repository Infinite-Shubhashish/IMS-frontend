import { Component, inject } from '@angular/core';
import { Authservice } from '../../auth/authservice';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../posts/service/service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,
    MatCardModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  private auth = inject(Authservice);
  private router = inject(Router);

  totalPosts: number = 0;
  statusStats: Record<string, number> = {};

  private PostService = inject(PostService);

  ngOnInit() {
    this.loadStats();
    this.loadStatusStats();
  }


  loadStats() {
    this.PostService.getCountTotalPosts().subscribe({
      next: (data) => {
        this.totalPosts = data.totalPosts;
      },
      error: (error) => {
        console.error('Error fetching total posts:', error);
      }
    });
  }

  loadStatusStats() {
    this.PostService.getCountTotalPostsStatus().subscribe({
      next: (data) => {
        this.statusStats = data;
      },
      error: (error) => {
        console.error('Error fetching status stats:', error);
      }
    });

  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
