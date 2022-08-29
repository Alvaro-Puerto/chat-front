import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public  echo = new Echo({
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
  constructor() { }
}
