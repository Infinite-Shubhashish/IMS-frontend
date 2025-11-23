import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Authservice } from '../authservice';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

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

  private router = inject(Router);

  submit() {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.getRawValue()).subscribe({
      next: (res) => {

        const roles = res.data?.roles ?? [];

        localStorage.setItem("username", res.data?.username || '');
        localStorage.setItem("roles", JSON.stringify(res.data?.roles));

        if (roles.includes('ADMIN')) {
          this.successMessage = res.message;
          console.log("SUCCESS:", res);
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/userdashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log("Fail to login:", err);

      }
    })
  }
}
