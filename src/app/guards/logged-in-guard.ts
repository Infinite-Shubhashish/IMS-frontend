import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../auth/authservice';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const auth = inject(Authservice);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.isAdmin()) {
    router.navigate(['admin/admindashboard']);
    return false;
  }
  else if (auth.isLoggedIn() && !auth.isAdmin()) {
    router.navigate(['/userdashboard']);
    return false;
  }

  return true;
};
