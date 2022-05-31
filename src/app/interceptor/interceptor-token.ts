import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorToken implements HttpInterceptor {
 
    constructor(
        private router: Router,
        private authService: AuthServiceService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.tokenReturn();

        if(token) {
            const req = request.clone({
                setHeaders: {'Authorization': `Bearer ${token}`}
            });
        }
        return next.handle(request.clone({
            setHeaders: {'Authorization': `Bearer ${token}`}
        })).pipe(
            catchError((err) => {
                if(err instanceof HttpErrorResponse) {
                    if(err.status === 401) {
                        
                        this.router.navigate(['login']);
                    }
                }
             return throwError(err);   
            })
        );
    }
}