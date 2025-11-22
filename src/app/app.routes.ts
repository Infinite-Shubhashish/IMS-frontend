import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

export const routes: Routes = [
    { path: '', title: 'Login Page', component: Login },
    { path: 'register', title: 'Register Page', component: Register }
];
