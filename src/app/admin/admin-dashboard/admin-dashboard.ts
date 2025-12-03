import { Component, inject } from '@angular/core';
import { Authservice } from '../../auth/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../posts/service/post.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../user/service/user.service';
import { UserStats } from "../../user/user-stats/user-stats/user-stats";
import { STATUS_ICONS } from '../../shared/model/status-icons';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,
    MatCardModule, RouterLink, UserStats, MatIcon],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  statusIcons = STATUS_ICONS;
  private auth = inject(Authservice);
  private router = inject(Router);

  totalPosts: number = 0;
  totalUsers: number = 0;
  statusStats: Record<string, number> = {};

  private PostService = inject(PostService);
  private UserService = inject(UserService);

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

    this.UserService.getCountTotalUsers().subscribe({
      next: (data: any) => {
        this.totalUsers = data.totalUsers;
      },
      error: () => {
        console.error('Error fetching total users:');
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

  openStatusPage(status: string) {
    this.router.navigate(['/admin/status', status]);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
