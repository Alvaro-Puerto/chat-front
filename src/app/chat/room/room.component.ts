import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  id: number;
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
      .subscribe((data:any) => {
        console.log(data);
        
      }, err => {
        console.log(err);
        
      });
  }

}
