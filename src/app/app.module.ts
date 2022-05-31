import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { ChatModule } from './chat/chat.module';
import { InterceptorToken } from './interceptor/interceptor-token';

function getToken(): string {
  return localStorage.getItem('access_token') || '';
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: getToken,
  }
};


@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    ChatModule,
    HttpClientModule,
    BrowserModule,
    JwtModule.forRoot(JWT_Module_Options),
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorToken,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
