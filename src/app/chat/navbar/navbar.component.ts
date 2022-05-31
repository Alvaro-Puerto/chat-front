import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchInput: FormControl = new FormControl();
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
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
