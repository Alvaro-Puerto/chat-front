import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { RoomComponent } from './room/room.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '', component: ParentComponent, children: [
      {
        path: '', component: RoomComponent
      },
      {
        path: 'search/:params', component: SearchComponent
      },
      {
        path: 'room/:id', component: RoomComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
