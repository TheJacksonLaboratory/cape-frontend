import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) {
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
    return this.http.post<any>(environment.API_URL + '/auth/login', { username, password }, this.httpOptions)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        const access_token = user['access_token'];
        const refresh_token = user['refresh_token'];
        if (user && access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const jsonString = JSON.stringify(user);
          localStorage.setItem('currentUser', jsonString);
          const new_user = new User();
          new_user.access_token = access_token;
          new_user.refresh_token = refresh_token;
          this.currentUserSubject.next(new_user);
        }
        return user;
      }));
  }

  /**
   * Refreshes the JWT token, to extend the time the user is logged in
   */
  public refreshToken() {
    this.http.post(environment.API_URL + '/auth/token/refresh', JSON.stringify({ token: this.token }), this.httpOptions).subscribe(
      data => {
        localStorage.setItem('currentUser', data['token']);
      },
      err => {
        console.error('refresh error', err);
        this.errors = err['error'];
      }
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    const item = localStorage.getItem('currentUser');
    if (item == null) { return false; }
    const refreshTok = JSON.parse(item)['refresh_token'];
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(refreshTok);
  }
}
