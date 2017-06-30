import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  outputs: ['updateUserEvent', 'deleteUserEvent', 'CloseEvent']
})
export class UserEditComponent implements OnInit {

  private editTitle: boolean = false;
  private updateUserEvent = new EventEmitter();
  private deleteUserEvent = new EventEmitter();
  private CloseEvent = new EventEmitter();
  @Input() user;

  private name: string;
  private lastname: string;
  private email: string;
  private dateOfBirth: string;
  private password: string;
  private role: string;
  constructor() { }

  ngOnInit() {
     this.name = this.user.name;
    this.lastname = this.user.lastname;
    this.email = this.user.email;
    this.dateOfBirth = this.user.dateOfBirth;
    this.password = this.user.password;
    this.role = this.user.role;
  }
  updateUser(user: any) {
    this.user.dateOfBirth = user.dateOfBirth;
   this.updateUserEvent.emit(this.user);
  }
  deleteUser() {
    this.deleteUserEvent.emit(this.user);
  }
  Close() {
    this.CloseEvent.emit();
    this.user.name = this.name;
    this.user.lastname = this.lastname;
    this.user.email = this.email;
    this.user.dateOfBirth = this.dateOfBirth;
    this.user.password = this.password;
    this.user.role = this.role;
  }
}
