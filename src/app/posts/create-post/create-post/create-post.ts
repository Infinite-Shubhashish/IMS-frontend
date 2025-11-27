import { Component, inject, OnInit } from '@angular/core';
import { PostType } from '../../model/post-type.enum';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { Post } from '../../post/post';
import { PostRequest } from '../../model/post-request.model';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { Authservice } from '../../../auth/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-create-post',
  imports: [MatFormField, ReactiveFormsModule, MatInput, MatSelect, MatButton, MatError, MatOption, MatLabel, MatIcon],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css',
})
export class CreatePost implements OnInit {
  postTypes = Object.values(PostType);

  readonly postTypeLabels: Record<PostType, string> = {
    [PostType.LOST_ITEM]: 'Lost Item',
    [PostType.HELP_REQUEST]: 'Help Request',
    [PostType.ANNOUNCEMENT]: 'Announcement',
    [PostType.ISSUE_COMPLAINT]: 'Issue Complaint',
    [PostType.NORMAL]: 'Normal'
  };

  postForm = new FormGroup({
    title: new FormControl<string>('', { validators: Validators.required }),
    description: new FormControl<string>('', { validators: Validators.required }),
    type: new FormControl<PostType | ''>('', { validators: Validators.required })
  });

  private postService = inject(PostService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private auth = inject(Authservice);
  private location = inject(Location);

  ngOnInit(): void { }


  submit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const request: PostRequest = this.postForm.getRawValue() as PostRequest;

    this.postService.createPost(request).subscribe({
      next: (res) => {
        this.snackBar.open("Post created successfully!", "OK", {
          duration: 3000,
          verticalPosition: "top"
        });
        this.postForm.reset();
        setTimeout(() => {
          if (this.auth.isAdmin()) {
            this.router.navigate(['/admin/admindashboard']);
          } else { this.router.navigate(['/userdashboard']); }  // or admindashboard
        }, 1000);
      },
      error: (error) => {
        console.error("Failed to create post:", error.error.message);
      }
    });
  }

  goBack() {

    this.location.back();
  }

}
