import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Conversation } from '../interfaces/conversation';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  id: number;
  conversation: Conversation
  constructor(
    private activateRoute: ActivatedRoute,
    private conversationService: ConversationService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => this.id = params['id']);
    this.getConversation();
  }

  getConversation() {
    this.conversationService.getConversationWithUser(this.id)
      .subscribe(data => {
        console.log(data);
        this.conversation = data;
      }, err => {
        console.log(err);
        
      });
  }

}
