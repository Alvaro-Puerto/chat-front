import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';
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
  
  


  //new Pusher(); 
  searchInput: FormControl = new FormControl();
  echo: any;
  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private contactService: ContactService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.subscribe();
  }

  subscribe() {
    this.websocketService.echo.join('user.online').here((user: User[]) => {
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
