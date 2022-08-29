import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Conversation } from '../interfaces/conversation';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  listConversation: Conversation[];
  public searchFilter: any = '';
  query: any;
  constructor(
    private conversationService: ConversationService
  ) { }

  ngOnInit(): void {
    this.getConversation();
  }

  getConversation() {
    this.conversationService.getAllConversation().subscribe(data => {
      console.log(data);
      this.listConversation = data;
    },(err: HttpErrorResponse) => {
      console.log(err);
    })
  }

}
