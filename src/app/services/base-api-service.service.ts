import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseApiServiceService {

  baseApi = 'http://localhost:8000/api';

  options: any;
  constructor() {
    this.options = {
      headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }).set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)}
   };
}
