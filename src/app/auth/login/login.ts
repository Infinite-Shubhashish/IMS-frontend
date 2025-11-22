import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Authservice } from '../authservice';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });


  successMessage: string | null = null;
  errorMessage: string | null = null;

  private auth = inject(Authservice);

  submit() {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.getRawValue()).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        console.log("SUCCESS:", res);
        alert("Logged in!");
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log("Fail to login:", err);
        alert("Invalid Credentials");
      }
    })
  }
}
