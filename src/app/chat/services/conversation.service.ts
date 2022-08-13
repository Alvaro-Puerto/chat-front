import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiServiceService } from 'src/app/services/base-api-service.service';
import { Conversation } from '../interfaces/conversation';
@Injectable({
  providedIn: 'root'
})
export class ConversationService extends BaseApiServiceService {

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  getConversationWithUser(id: number): Observable<Conversation> {
    return this.http.get<Conversation>(this.baseApi + `/conversation/${id}`);
  }
}
