import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../../auth/service/auth.service';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Authservice);
  const router = inject(Router);

  // allow if logged in and role is admin
  if (auth.isLoggedIn() && auth.isAdmin()) {
    return true;
  }

  // if logged in as user - redirect to user dashboard
  if (auth.isLoggedIn() && auth.isUser()) {
    router.navigate(['user/userdashboard']);
    return false;
  }

  // if not logged in - redirect to login page
  router.navigate(['/']);
  return false;

};
