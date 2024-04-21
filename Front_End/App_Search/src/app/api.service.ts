
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom,} from 'rxjs';
import { EnroutesService } from './enroutes.service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl : String;
  private HttpClient=inject(HttpClient);
  domain=''
  constructor(private EnroutesService: EnroutesService){
    this.domain=this.EnroutesService.domain;
    this.apiUrl=this.domain+'API_Gateway';
  }

  loginer(formValue: any){
    return firstValueFrom(
      this.HttpClient.post<any>(`${this.apiUrl}`,formValue)
    )
  }

  

}

