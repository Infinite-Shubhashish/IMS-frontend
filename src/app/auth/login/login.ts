import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Authservice } from '../service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
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

  private router = inject(Router);

  submit() {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.getRawValue()).subscribe({
      next: (res) => {
        const roles = res.data?.roles ?? [];
        if (roles.includes('ADMIN')) {
          this.successMessage = res.message;
          console.log("SUCCESS:", res);
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/user']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || err.message || "Login failed";
        console.log("Fail to login:", err);

      }
    })
  }
}
