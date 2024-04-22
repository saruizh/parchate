import { CanActivateFn } from '@angular/router';


export const logauthGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('token');
  return !!accessToken;
};


