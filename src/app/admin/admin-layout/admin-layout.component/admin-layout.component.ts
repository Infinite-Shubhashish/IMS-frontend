import { Component, inject } from '@angular/core';
import { Authservice } from '../../../auth/service/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admin-layout.component',
  imports: [RouterOutlet, RouterLink, MatIcon],
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
