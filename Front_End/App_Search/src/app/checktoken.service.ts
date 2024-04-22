import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnroutesService } from './enroutes.service';

@Injectable({
  providedIn: 'root'
})
export class ChecktokenService {

  
  private verifyTokenUrl = this.EnroutesService.domain+'api/token/verify/';

  constructor(private http: HttpClient, private router: Router, private EnroutesService:EnroutesService) {}

  verifyToken(token: string): Observable<any> {
    return this.http.post(this.verifyTokenUrl, {token});
  }
  enroute(){
    this.router.navigate(['/login']);
  }
}
