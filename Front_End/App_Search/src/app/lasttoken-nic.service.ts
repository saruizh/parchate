import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnroutesService } from './enroutes.service';

@Injectable({
  providedIn: 'root'
})
export class LasttokenNICService {
  
  NIC: string = '';
  private url = this.EnroutesService.domain+'api/Validate_Base_NIC/';

  constructor(private EnroutesService:EnroutesService,private http: HttpClient) {}

  setNIC(nic: string): string {
    this.NIC = nic;
    return this.EnroutesService.domain+`api/Validate_Base_NIC/${this.NIC}/`;
  }

  getData(url: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    return this.http.get<any>(url, { headers });
    }
    else {
      return this.http.get<any>(url);
    }
  }

  setNICSMS(nic: string): string {
    this.NIC = nic;
    return this.EnroutesService.domain+`api/sms_enviados_NIC_lastToken/${this.NIC}/`;
  }
  gettokenData(url: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    return this.http.get<any>(url, { headers });
    }
    else {
      return this.http.get<any>(url);
    }
  }

}
