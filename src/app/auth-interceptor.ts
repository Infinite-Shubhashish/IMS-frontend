import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('authToken');


  const publicEndpoints = ['/auth/login', '/auth/register'];

  const isPublic = publicEndpoints.some(url => req.url.includes(url));

  if (isPublic) {
    return next(req);
  }

  if (token) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: token
      }
    });

    return next(modifiedReq);
  }

  return next(req);
};
