import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../../auth/authservice';

@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {
  private auth = inject(Authservice);
  private router = inject(Router);


  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
