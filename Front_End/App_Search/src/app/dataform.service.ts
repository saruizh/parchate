import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { EnroutesService } from './enroutes.service';

@Injectable({
  providedIn: 'root'
})
export class DataformService {

  private apiUrl = this.EnroutesService.domain+'api/Envio_sms/';
  private appUrl =this.EnroutesService.domain+'api/Ingresar_Registro_Base/';
  
  
  constructor(private EnroutesService:EnroutesService,private http: HttpClient) {}
  postData(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      // Crear un objeto de encabezado con el token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<any>(this.apiUrl, data, { headers });
    } else {
      return this.http.post<any>(this.apiUrl, data);
    }
  }

  CreateRegister(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      // Crear un objeto de encabezado con el token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<any>(this.appUrl, data, { headers });
    } else {
      return this.http.post<any>(this.appUrl, data);
    }
  }





}
