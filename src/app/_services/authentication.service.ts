import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

import * as JWT from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  // http options used for making API calls
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // the actual JWT token
  public token: string;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public getUserFullname() {
    if (this.userSubject == null)
      return '';
    let identity = JWT(this.userValue.access_token).sub;
    return identity.first_name + ' ' + identity.last_name;
  }

  public getUsername() {
    if (this.userSubject == null)
      return '';
    let identity = JWT(this.userValue.access_token).sub;
    return identity.username;
  }

  public getUserId() {
    if (this.userSubject == null)
      return '';
    let identity = JWT(this.userValue.access_token).sub;
    return identity.user_id;
  }

  isAuthenticated() {
    console.log('is user authenticated? ');
    // Send request to backend to check auth status
    return this.http.get<any>(environment.AUTH_URL + '/verify');
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.AUTH_URL + '/login', { username, password }, this.httpOptions)
      .pipe(map(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.router.navigate(['login']);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.AUTH_URL}/refresh`, {}, { withCredentials: true })
      .pipe(map((user) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userValue.access_token.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
