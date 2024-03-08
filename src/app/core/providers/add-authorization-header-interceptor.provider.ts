import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddAuthorizationHeaderInterceptor } from '../interceptors/add-authorization-header.interceptor';

export const addAuthorizationHeaderInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AddAuthorizationHeaderInterceptor,
  multi: true,
};
