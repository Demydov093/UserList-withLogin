import { Injectable } from '@angular/core';
import { Http, Headers, Response ,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private _http: Http) {
// set token if saved in local storage
 const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.token = currentUser && currentUser.token;
}

login(name: String, password: String): Observable<boolean> {
  const headers = new Headers({'Content-Type': 'application/json'});
  const options = new RequestOptions({headers: headers});
  return this._http.post('/api/authenticate', JSON.stringify({name: name, password: password }), options)
    .map((response: Response) => {
      // login successful if there's a jwt token in the response
      const token = response.json() && response.json().token;
      if (token) {
        // set token property
        this.token = token;
        console.log('Enter token');
        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify({ name: name, token: token }));
        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        console.log('no Enter token');
        return false;
      }
    });
}

logout(): void {
  // clear token remove user from local storage to log user out
  this.token = null;
localStorage.removeItem('currentUser');
}
}
