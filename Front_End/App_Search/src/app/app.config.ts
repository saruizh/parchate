import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { authlogoutInterceptor } from './authlogout.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideAnimations(),
    provideHttpClient(withInterceptors([authlogoutInterceptor])),
    JwtHelperService,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
};
