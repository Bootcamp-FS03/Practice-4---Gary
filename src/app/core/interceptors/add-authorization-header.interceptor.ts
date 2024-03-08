import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AddAuthorizationHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    // skip interceptor if token doesn't exists
    if (!token) return next.handle(request);

    const newRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });

    return next.handle(newRequest);
  }
}
