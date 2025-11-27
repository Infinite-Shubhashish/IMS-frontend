import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../../auth/service/auth.service';
import { inject } from '@angular/core';

export const postGuard: CanActivateFn = () => {
  const auth = inject(Authservice);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }


  return true;
};