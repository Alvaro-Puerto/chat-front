import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Echo from 'laravel-echo';
import { AuthServiceService } from '../../services/auth-service.service';
import { User } from '../interfaces/user';
import { ContactService } from '../services/contact.service';
//import Pusher from 'pusher-js';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  private echo = new Echo({
    broadcaster: 'pusher',
    key: "292e57e89b479278c5f9",
    cluster: "mt1",
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
    auth: {
      headers: {
        Authorization :`Bearer ${localStorage.getItem('access_token')}`,
       
      },
    }
   });


  //new Pusher(); 
  searchInput: FormControl = new FormControl();

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.subscribe();
  }

  subscribe() {
    this.echo.join('user.online').here((user: User[]) => {
      this.contactService.activateUser(user);
    }).joining((user: User) => {
      this.contactService.joinUser(user);
    }).leaving((user: User) => {
      this.contactService.leavingUser(user);
    });
  }


  logout() {
    this.authService.logout()
    .subscribe((data:any) => {
      localStorage.removeItem('access_token');
      this.router.navigate(['login']);
    }, (err: HttpErrorResponse) => {
      console.log(err);      
    })
  }

  redirectToSearch() {
    this.router.navigate(['./search', this.searchInput.value]);
  } 


}
