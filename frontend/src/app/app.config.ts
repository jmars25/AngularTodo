 import { ApplicationConfig } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { provideHttpClient, withInterceptors } from '@angular/common/http';
  import { routes } from './app.routes';
  import { authInterceptorFactory } from './interceptors/auth-interceptor-factory';

  export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideHttpClient(withInterceptors([authInterceptorFactory]))
    ]
  };