import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseApiServiceService } from 'src/app/services/base-api-service.service';
import { User } from '../interfaces/user';
import { ListServicesService } from './list-services.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseApiServiceService {

  constructor(
    private http: HttpClient,
    private listService: ListServicesService
    ) { 
    super();
  }

  getContact(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApi + '/contact');
  }

  removeContact(id: number): Observable<User> {
    return this.http.delete<User>(this.baseApi + '/contact/' + id).pipe(
      (map((item) => {
        const index = this.listService.listContact.findIndex(res => res.id === item.id);
        this.listService.listContact.splice(index, 1)
        return item;
      }))
    );

  }
}


