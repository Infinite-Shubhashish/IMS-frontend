import { Component, inject } from '@angular/core';
import { Authservice } from '../../../auth/authservice';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout.component',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {

  private auth = inject(Authservice);
  private router = inject(Router);
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
