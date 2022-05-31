import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) { }

  canActivate(): boolean {
    if(!this.authService.isAuthenticate()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
