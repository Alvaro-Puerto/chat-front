import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { ContactService } from '../services/contact.service';
import { ListServicesService } from '../services/list-services.service';
//import Echo from 'laravel-echo';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  listContact: User[];
  public searchFilter: any = '';
  query: any;
  constructor(
    private contactService: ContactService,
    public listService: ListServicesService
  ) { 

  }

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.contactService.getContact()
      .subscribe((data) => {
          this.listService.listContact = data;
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  removeContact(id: number) {
    this.contactService.removeContact(id)
      .subscribe(data => {
        alert('Contacto ' + data.name + 'ha sido eliminado ');
      }, (err: HttpErrorResponse) =>{
        alert('Hubo un error');
        console.log(err);
        
      }) 
  }
}
