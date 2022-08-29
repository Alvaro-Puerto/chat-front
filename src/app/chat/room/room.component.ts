import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Conversation, ConversationDetail } from '../interfaces/conversation';
import { Message } from '../interfaces/Message';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  id: number;
  conversation: ConversationDetail;
  
  inputMessage = new FormControl();
  constructor(
    private activateRoute: ActivatedRoute,
    private conversationService: ConversationService,
    private websocketService: WebsocketService

  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getConversation();
    });
    
  }

  getConversation() {
    console.log(this.id);
    this.conversationService.getConversationWithUser(this.id)
      .subscribe(data => {
        console.log(data);
        this.conversation = data;
        this.subscribe();
        console.log(this.conversation)
      }, err => {
        console.log(err);
        
      });
  }

  sendMessage() {
      this.conversation.participant = [];
      this.conversation.participant.push({
        id: this.id
      });

    this.conversation.last_message = this.inputMessage.value;
    this.conversationService.sendMessage(this.conversation)
      .subscribe(data => {
        
          var message: Message;
          message = {
            name: '',
            pivot: {
              content: this.inputMessage.value,
              created_at: new Date(),
              id: null
            }
          }
          this.conversation.message.push(message);

          this.inputMessage.reset();
      },(err: HttpErrorResponse) =>{
        console.log(err);
      });
  }

  subscribe() {
    this.websocketService.echo.private(`room.${this.conversation.id}`)
    .listen('NewMessageEvent', (e:any) => {
        console.log(e);
    });
  }
}
