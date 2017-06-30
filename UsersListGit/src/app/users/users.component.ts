import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ UserService ]
})
export class UsersComponent implements OnInit {

  users: Array<User>;

  selectedUser: User;
  private hidenewUser = true;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUsers()
      .subscribe(resUserData => this.users = resUserData);
  }
 onSelectUser(user: any) {
    this.selectedUser = user;
    this.hidenewUser = true;
 }
 onSubmitAddUser(user: User) {
    this._userService.addUser(user)
      .subscribe(resNewUser => {
        this.users.push(resNewUser);
        this.hidenewUser = true;
      });
 }
 newUser() {
    this.hidenewUser = false;
 }
 newClose() {
   this.hidenewUser = true;
 }
 onUpdateUserEvent(user: any) {
   this._userService.updateUser(user)
     .subscribe(resUpdate => user = resUpdate);
   this.selectedUser = null;
 }
 onClose() {
   this.selectedUser = null;
 }
  onDeleteUserEvent(user: any) {
   const userArray = this.users;
   this._userService.deleteUser(user)
     .subscribe(resDeleteUser => {
       for (let i = 0; i < userArray.length; i++) {
         if (userArray[i]._id === user._id) {
           userArray.splice(i, 1);
         }
       }
     });
   this.selectedUser = null;
  };
}
