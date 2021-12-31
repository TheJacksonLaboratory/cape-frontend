import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

import * as JWT from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

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
    if (this.userValue == null)
      return '';
    let identity = JWT(this.userValue.access_token).sub;
    return identity.first_name + ' ' + identity.last_name;
  }

  public getUsername() {
    if (this.userValue == null)
      return '';
    let identity = JWT(this.userValue.access_token).sub;
    return identity.username;
  }

  public getUserId() {
    if (this.userValue == null)
      return '';
    let identity = JWT(this.userValue.access_token).sub;
    return identity.user_id;
  }

  isAuthenticated() {
    // Send request to backend to check auth status
    return this.http.post<any>(environment.AUTH_URL + '/verify', this.httpOptions)
      .catch(AuthenticationService._handleError);;
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.AUTH_URL + '/login', { username, password }, this.httpOptions)
      .pipe(map(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        this.fireIsLoggedIn.emit(user);
        return user;
      }));
  }

  getLoggedInEmitter() { 
    return this.fireIsLoggedIn; 
  } 

  logout() {
    localStorage.removeItem('currentUser');
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/logout']);
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
    if (this.userValue == null)
      return;
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

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
}
}
