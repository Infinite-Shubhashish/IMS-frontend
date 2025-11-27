import { Component, inject } from '@angular/core';
import { Authservice } from '../../auth/service/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, RouterLink, MatIcon],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {

  private auth = inject(Authservice);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
