import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../auth/service/auth.service';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const auth = inject(Authservice);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    if (auth.isAdmin()) {
      router.navigate(['/admin/admindashboard']);
    } else {
      router.navigate(['/user/userdashboard']);
    }
    return false;
  }

  return true;
};
