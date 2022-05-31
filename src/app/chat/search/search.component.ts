import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user';
import { ContactService } from '../services/contact.service';
import { ListServicesService } from '../services/list-services.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  name: string = '';
  listUser: User[];
  isLoading: number = -1;
  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private activateRoute: ActivatedRoute,
    private contactService: ContactService,
    private listService: ListServicesService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => this.name = params['params']);
    this.searchUser();
  }

  searchUser() {
    this.userService.searchUser(this.name)
    .subscribe(data => {
      console.log(data);
      this.listUser = data;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  removeContact(id: number) {
    this.isLoading = id;
    this.contactService.removeContact(id)
      .subscribe(data => {
        this.toastrService.success(`Tu contacto ${data.name} ha sido removido correctamente`);
        const user = this.listUser.find(res => res.id === data.id)
        user.is_contact = false;
        this.isLoading = -1;
      }, (err: HttpErrorResponse) =>{
        alert('Hubo un error');
        console.log(err);
        
      }) 
  }

  addContact(id: number) {
    this.isLoading = id;
    this.userService.addContact(id)
      .subscribe((data) => {
        this.toastrService.success('Contacto anexado correctamente');
        this.isLoading = -1;
        this.listService.listContact.push(data);
        const user = this.listUser.find(res => res.id === data.id)
        user.is_contact = true;
      }, (err: HttpErrorResponse) => {
        console.log(err);
      })
  }
}
