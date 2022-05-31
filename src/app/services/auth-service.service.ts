import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseApiServiceService } from './base-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService extends BaseApiServiceService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService
  ) { 
    super();
  }

  tokenReturn() {
    return localStorage.getItem('access_token');
  }

  isAuthenticate(): boolean {
    const token = localStorage.getItem('access_token');
    //const token = localStorage.getItem('token');

    return !this.jwtService.isTokenExpired(token || undefined);
  }

  login(data: any) {
    return this.http.post(this.baseApi + '/login',data, this.options);
  }

  signup(data:any) {
    return this.http.post(this.baseApi + '/register', data, this.options);
  }

  logout() {
    return this.http.get(this.baseApi + '/logout', this.options);
  }
}
