import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ChecktokenService } from './checktoken.service';


export const authlogoutInterceptor: HttpInterceptorFn = (req, next) => {
  

  return next(req).pipe(
    catchError( (error)=>{
      if([403,401].includes(error.status)){
        const p=inject(ChecktokenService).enroute();
      }
      const e = error.error.message || error.statusText;
      return throwError(()=>error);      
    })
  )


  //console.log(`this way for request in ${req.url}`);

  //return next(req);
};
