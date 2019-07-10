import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: string;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'currentUser' })
    };
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.API_URL + '/auth/login', { username, password }) // , this.httpOptions)
      .pipe(map(res => {
        // login successful if there's a jwt token in the response
        if (res && res.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(res));
          // store the time at which the token should expire
          const timeToLogin = Date.now() + 86400000; // 1 day
          localStorage.setItem('timer', JSON.stringify(timeToLogin));

          this.currentUserSubject.next(res);
        }
        return res;
      }));
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}
