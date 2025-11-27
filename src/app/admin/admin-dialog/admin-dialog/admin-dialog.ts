import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-dialog',
  imports: [MatDialogModule, FormsModule],
  templateUrl: './admin-dialog.html',
  styleUrl: './admin-dialog.css',
})
export class AdminDialog {

  comment: string = '';

  private dialogRef = inject(MatDialogRef<AdminDialog>);

  cancel() {
    this.dialogRef.close(null);
  }

  submit() {
    this.dialogRef.close(this.comment);
  }

}
