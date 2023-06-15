import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        },
        withCredentials: true // enable sending cookies
      });
    }
    return next.handle(req);
  }
  //   const jwt = localStorage.getItem('token');
  //   if (jwt) {
  //     req = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${jwt}`
  //       },
  //       withCredentials: true // enable sending cookies
  //     });
  //   }
  //   return next.handle(req);
  // }
}
