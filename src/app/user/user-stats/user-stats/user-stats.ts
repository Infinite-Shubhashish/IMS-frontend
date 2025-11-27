import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { UserService } from '../../service/user.service';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

@Component({
  selector: 'app-user-stats',
  imports: [MatCard, MatCardTitle, MatCardContent],
  templateUrl: './user-stats.html',
  styleUrl: './user-stats.css',
})
export class UserStats implements OnInit {

  private userService = inject(UserService);

  ngOnInit(): void {
    Chart.register(PieController, ArcElement, Tooltip, Legend);

    this.userService.getUserStatusSummary().subscribe(summary => {
      this.loadChart(summary.data);
      console.log(summary.data);
    });
  }

  loadChart(summary: any) {
    new Chart("statusChart", {
      type: 'pie',
      data: {
        labels: ["Active", "Locked", "Expired", "Credentials Expired"],
        datasets: [{
          data: [
            summary.activeUsers,
            summary.lockedUsers,
            summary.expiredAccounts,
            summary.credentialsExpired
          ],
          backgroundColor: [
            '#4CAF50', // active
            '#F44336', // locked
            '#FFC107', // expired
            '#9C27B0'  // credentials expired
          ]
        }]
      }
    });
  }
}
