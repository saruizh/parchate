import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnroutesService {
  domain: string = 'http://localhost:8000/';
  constructor() { }
}
