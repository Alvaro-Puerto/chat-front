import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCustomValidatorServiceService } from '../services/auth-custom-validator-service.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private validateCustom: AuthCustomValidatorServiceService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'name': ['', [Validators.required, Validators.min(5)]],
      'password': ['', [Validators.required, this.validateCustom.patternValidator()]],
      'email': ['', [Validators.required, Validators.email]],
      'password_confirmation': ['', [Validators.required]]
    }, {
      validator: this.validateCustom.matchPassword('password', 'password_confirmation')
    })
  }

  get getRegisterControl() {
    return this.registerForm.controls;
  }

  sendForm() {
    this.submitted = true;
    if(this.registerForm.valid) {
      this.authService.signup(this.registerForm.value)
        .subscribe((data:any) => {
          this.router.navigate(['login']);
        }, (err: HttpErrorResponse) => {
          alert('Error');
          console.log(err);
        })
    }
  }

}
