
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom,} from 'rxjs';
import { EnroutesService } from './enroutes.service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl : string;
  
  domain=''
  constructor(private httpClient: HttpClient,private EnroutesService: EnroutesService){
    this.domain=this.EnroutesService.domain;
    this.apiUrl = `${this.EnroutesService.domain}graphql/`;
  }
  async register(email: string, username: string, password: string) {
    const mutation = `
      mutation CreateUser($email: String!, $username: String!, $password: String!) {
        createUser(email: $email, username: $username, password: $password) {
          appUser {
            email
            username
          }
        }
      }
    `;
    const response = await firstValueFrom(this.httpClient.post<any>(this.apiUrl, {
      query: mutation,
      variables: {
        email,
        username,
        password
      }
    }));
    return response;
  }

  async loginer(username: string, password: string) {
    const mutation = `
      mutation tokenAuth($username: String!, $password: String!) {
        tokenAuth( username: $username, password: $password) {
          token
        }
      }
    `;
    const response = await firstValueFrom(this.httpClient.post<any>(this.apiUrl, {
      query: mutation,
      variables: {
        username,
        password
      }
    }));
    return response;
  }
}

