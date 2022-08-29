import { Injectable } from '@angular/core';
import { Conversation } from '../interfaces/conversation';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ListServicesService {

  public listContact: User[];
  public listConversation: Conversation[];
  constructor() { }
}
