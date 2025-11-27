import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { PostResponse } from '../../model/post-response.model';
import { PostType } from '../../model/post-type.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostRequest } from '../../model/post-request.model';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  imports: [MatFormField, ReactiveFormsModule, MatInput, MatSelect, MatButton, MatError, MatOption, MatLabel, MatIcon],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.css',
})
export class EditPost {

  post: PostResponse | null = null;
  postTypes = Object.values(PostType);

  readonly postTypeLabels: Record<PostType, string> = {
    [PostType.LOST_ITEM]: 'Lost Item',
    [PostType.HELP_REQUEST]: 'Help Request',
    [PostType.ANNOUNCEMENT]: 'Announcement',
    [PostType.ISSUE_COMPLAINT]: 'Issue Complaint',
    [PostType.NORMAL]: 'Normal'
  };

  editForm = new FormGroup({
    title: new FormControl<string>('', { validators: Validators.required }),
    description: new FormControl<string>('', { validators: Validators.required }),
    type: new FormControl<string | ''>('', { validators: Validators.required })
  });

  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private location = inject(Location);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getPostById(id).subscribe({
      next: (res) => {
        this.post = res.data ?? null;

        this.editForm.patchValue({
          title: this.post?.title ?? null,
          description: this.post?.description,
          type: this.post?.postType
        });
      }
    });
  }

  save(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const request: PostRequest = this.editForm.getRawValue() as PostRequest;
    if (!this.post) return;

    this.postService.updatePost(this.post.id, request).subscribe({
      next: () => {
        this.snackBar.open("Post updated successfully!", "OK", {
          duration: 3000,
          verticalPosition: "top"
        });
        this.goBack();
      }
    });

  }

  goBack() {
    this.location.back();
  }


}
