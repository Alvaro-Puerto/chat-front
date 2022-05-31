import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseApiServiceService } from 'src/app/services/base-api-service.service';
import { User } from '../interfaces/user';
import { ListServicesService } from './list-services.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiServiceService {

  constructor(
    private http: HttpClient,
    private listService: ListServicesService
  ) { 
    super();
  }

  searchUser(name: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseApi + `/user/search/${name}`).pipe(
      map((item) => {
        item.forEach(data => {
          data.is_contact = false;
          if(this.listService.listContact.find(temp => temp.email === data.email)) {
            data.is_contact = true;
          }
        });
        return item;
      })
    );
  }

  addContact(id: number): Observable<User> {
    return this.http.get<User>(this.baseApi + '/user/contact/' + id).pipe(
      map((item) => {
        item.is_contact = true;
        return item;
      })
    );
  }
}
