import { Component, OnInit , EventEmitter} from '@angular/core';
import {User} from "../user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  inputs: ['users'],
  outputs: ['SelectUser', 'deleteUserEvent']
})
export class UserListComponent implements OnInit {

  public SelectUser = new EventEmitter();
  private deleteUserEvent = new EventEmitter();
  public number: number;
  constructor() { }

  ngOnInit() {
    this.number = 10;
  }
   onSelect(user: User) {
    this.SelectUser.emit(user);
   }
  deleteUser(user: User) {
    this.deleteUserEvent.emit(user);
  }
}
