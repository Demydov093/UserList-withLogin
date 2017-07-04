import {Component, OnInit, EventEmitter, Input} from '@angular/core';
import {User} from "../user";
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  outputs: ['SelectUser', 'deleteUserEvent', 'paginationEvent'],
  providers: [ UserService ]
})
export class UserListComponent implements OnInit {

  @Input() users;
  public SelectUser = new EventEmitter();
  private deleteUserEvent = new EventEmitter();
  private paginationEvent = new EventEmitter();
  public number: number;
  public search: string;
  public p: number;
  public totalcount: number;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.number = 5;
    this._userService.getUsersCount()
      .subscribe(resData => {
        this.totalcount = resData;
      console.log(this.totalcount);
      });
    this._userService.getUsers(this.p, this.number)
      .subscribe(resUserData => this.users = resUserData);
  }
   onSelect(user: User) {
    this.SelectUser.emit(user);
   }
  deleteUser(user: User) {
    this.deleteUserEvent.emit(user);
  }
  pagination(p: any) {
    this._userService.getUsers(p, this.number)
      .subscribe(resUserData => this.users = resUserData);
  }
  searchUser() {
    console.log(this.search);
    this._userService.getSearchUser(this.search)
      .subscribe(resUserData => this.users = resUserData);
  }
}
