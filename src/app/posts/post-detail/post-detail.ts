import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResponse } from '../model/post-response.model';
import { DatePipe } from '@angular/common';
import { Authservice } from '../../auth/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminDialog } from '../../admin/admin-dialog/admin-dialog/admin-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-post-detail',
  imports: [DatePipe, MatIcon, MatButton],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail implements OnInit {

  post: PostResponse | null = null;
  errorMessage: string | null = null;
  isAdmin: boolean = false;
  loggedInUser: string = '';

  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private authService = inject(Authservice);
  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private location = inject(Location);

  showSnack(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }


  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loggedInUser = this.authService.getUsername();
    console.log("Logged in user:", this.loggedInUser);
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchPostDetails(id);
  }


  fetchPostDetails(id: any) {
    this.postService.getPostById(id).subscribe({
      next: (res) => {
        this.post = res.data ?? null;
      },
      error: (error) => {
        this.errorMessage = error.error.message + " : " + error.error.code || 'Failed to fetch post details';
      }
    });
  }

  submitPost() {
    if (!this.post) return;

    this.postService.submitForApproval(this.post.id).subscribe({
      next: (res) => {
        this.post = res.data ?? null;
        this.showSnack('Post submitted for approval!');
        this.ngOnInit();
      },
      error: (err) => {
        this.showSnack(err.error.message || 'Failed to submit post');
      }
    });
  }


  approvePost() {
    if (!this.post) return;

    this.postService.approvePost(this.post.id).subscribe({
      next: (res) => {
        this.post = res.data ?? null;
        this.showSnack('Post approved successfully!');
        setTimeout(() => this.ngOnInit(), 500);
      },
      error: (error) => {
        this.showSnack(error.error.message || 'Failed to approve post');
      }
    });
  }

  closePost() {
    const dialogRef = this.dialog.open(AdminDialog, { width: '400px' });

    dialogRef.afterClosed().subscribe((result: string | null) => {
      if (result === null || !this.post) return;

      this.postService.closePost(this.post.id, result).subscribe({
        next: (res) => {
          this.post = res.data ?? null;
          this.showSnack('Post closed successfully!');
          setTimeout(() => this.ngOnInit(), 500);
        },
        error: (error) => {
          this.showSnack(error.error.message || 'Failed to close post');
        }
      });
    });
  }


  rejectPost() {
    const dialogRef = this.dialog.open(AdminDialog, { width: '400px' });

    dialogRef.afterClosed().subscribe((result: string | null) => {
      if (result === null || !this.post) return;

      this.postService.rejectPost(this.post.id, result).subscribe({
        next: (res) => {
          this.post = res.data ?? null;
          this.showSnack('Post rejected successfully!');
          setTimeout(() => this.ngOnInit(), 500);
        },
        error: (error) => {
          this.showSnack(error.error.message || 'Failed to reject post');
        }
      });
    });
  }

  canEdit(): boolean {
    if (!this.post) return false;
    return (
      this.post.createdByUsername === this.loggedInUser &&
      (this.post.postStatus === 'DRAFT' || this.post.postStatus === 'REJECTED')
    );

  }

  goToEdit(): void {
    this.router.navigate(['/edit-post', this.post?.id]);
  }


  goBack() {
    this.location.back();
  }


}