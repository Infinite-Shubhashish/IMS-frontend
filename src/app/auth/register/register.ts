import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../authservice';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]
    }),

    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
      ]
    }),

    firstName: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    lastName: new FormControl<string>('', {
      nonNullable: true
    }),

    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.email
      ]
    }),


    contact: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.pattern(
          /^(?:\+977-?)?(9[0-9]{9})$/
        )
      ]
    })
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  private auth = inject(Authservice);

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched;
      return
    };

    this.auth.register(this.registerForm.getRawValue()).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        console.log("SUCCESS:", res);
        alert("You have registered in as User!");
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log("Fail to Register:", err);
        alert("Try again");
      }
    })
  }
}
