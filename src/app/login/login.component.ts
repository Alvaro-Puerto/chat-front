import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCustomValidatorServiceService } from '../services/auth-custom-validator-service.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private validateCustom : AuthCustomValidatorServiceService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, this.validateCustom.patternValidator()]]
    })
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  sendLogin() {
    this.submitted = true;
    if(true) {
      this.authService.login(this.loginForm.value)
      .subscribe((data:any) => {
        console.log(data);
        localStorage.setItem('access_token', data.token);
        this.router.navigate(['/']);
      },(err: HttpErrorResponse) => {
        console.log(err);
      })
    }
  }

}
