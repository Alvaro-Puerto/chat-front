import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiServiceService } from 'src/app/services/base-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService extends BaseApiServiceService {

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  getConversationWithUser(id: number) {
    return this.http.get(this.baseApi + `/conversation/${id}`);
  }
}
