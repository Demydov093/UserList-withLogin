import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from "ngx-pagination";
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./guards/auth.guard";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./user.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    UserListComponent,
    UserEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
