import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnroutesService {
  domain: string = 'https://localhost:5003/';
  constructor() { }
}
