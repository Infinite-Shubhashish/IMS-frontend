import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authservice } from './auth/service/auth.service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  const authService = inject(Authservice);
  const router = inject(Router);

  const token = authService.token;

  const publicEndpoints = ['/auth/login', '/auth/register'];

  const isPublic = publicEndpoints.some(url => req.url.includes(url));

  if (isPublic) {
    return next(req);
  }

  if (!token || !authService.isLoggedIn()) {
    router.navigate(['/login'])

    authService.logout()

    return EMPTY;
  }

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(modifiedReq);

};
