import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from './user';
import {Md5} from 'ts-md5/dist/md5';

import { Observable } from 'rxjs/';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class UserService {

  private _getUrl = '/api/users';
  private _postUrl = '/api/user';
  private _putUrl = '/api/user/';
  private _deleteUrl = '/api/user/';
  public count: number;
  constructor(private _http: Http, private authenticationService: AuthenticationService) { }

   getUsers(p: any, number: any): Observable<User[]>  {
     // add authorization header with jwt token
     const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'p' : p , 'number' : number  });
     const options = new RequestOptions({ headers: headers,  });

     // get users from api
    return this._http.get(this._getUrl, options)
      .map((response: Response) => response.json());
   }
  getUsersCount() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    // get users from api
    console.log('From api');
   return this._http.get(this._getUrl + 'count')
     .map((response: Response) => {
       // login successful if there's a jwt token in the response
       const count = response.json() && response.json().count;
        console.log(count);
        return count;
     });
  }
   addUser(user: User) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
     // user.password = Md5.hashStr(user.password).toString();
    return this._http.post(this._postUrl, JSON.stringify(user), options)
      .map((response: Response) => response.json());
   }
  updateUser(user: User) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.put(this._putUrl + user._id, JSON.stringify(user), options)
      .map((response: Response) => response.json());
  }
  deleteUser(user: User) {
    console.log(user);
    return this._http.delete(this._deleteUrl + user._id)
      .map((response: Response) => response.json());
  }

  getSearchUser(searchUser: any): Observable<User[]>  {
    // add authorization header with jwt token
    const firstString = searchUser.split(' ')[0];
    const secondString = searchUser.split(' ')[1];
    console.log(firstString);
    console.log(secondString);
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'search1' : firstString , 'search2' : secondString  });
    const options = new RequestOptions({ headers: headers,  });

    // get users from api
    return this._http.get(this._getUrl + 'search', options)
      .map((response: Response) => response.json());
  }
}
