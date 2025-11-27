import { Component, inject, OnInit } from '@angular/core';
import { UserResponse } from '../model/user-response.model';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {

  users: UserResponse[] = [];

  page = 0;
  size = 3;
  totalPages = 0;

  private userService = inject(UserService);
  // private router = inject(Router);
  // private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.page, this.size).subscribe(res => {
      this.users = res.data.content;
      this.totalPages = res.data.totalPages;
    });
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadUsers();
    }

  }
}
