import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor( private router: Router, private _http: Http,
               private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }
  login() {
    console.log(this.model.name, this.model.password);
    this.loading = true;
    this.authenticationService.login(this.model.name, this.model.password)
      .subscribe(result => {
        console.log(result);
        if (result === true) {
          // login successful
          this.router.navigate(['/home']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
