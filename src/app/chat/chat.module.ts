import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { RoomComponent } from './room/room.component';
import { ParentComponent } from './parent/parent.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorToken } from '../interceptor/interceptor-token';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFilterPipe } from '../pipe/search-filter.pipe';
import { ConversationComponent } from './conversation/conversation.component';


@NgModule({
  declarations: [
    RoomComponent,
    ParentComponent,
    NavbarComponent,
    SearchComponent,
    ContactComponent,
    SearchFilterPipe,
    ConversationComponent
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-top-right'
    }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    CommonModule,
    ChatRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorToken,
      multi: true
    }
  ]
})
export class ChatModule { }
