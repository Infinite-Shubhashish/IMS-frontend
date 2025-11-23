import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Authservice } from '../../auth/authservice';

export const userGuard: CanActivateFn = (route, state) => {
  const auth = inject(Authservice);
  const router = inject(Router);

  // allow if logged in and role is user
  if (auth.isLoggedIn() && auth.isUser()) {
    return true;
  }

  // if logged in as admin - redirect to admin dashboard
  if (auth.isLoggedIn() && auth.isAdmin()) {
    router.navigate(['/admindashboard']);
    return false;
  }
  // if not logged in - redirect to login page
  router.navigate(['/']);
  return false;
};
