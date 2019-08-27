import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/catch';

import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    private static _handleError(err: HttpErrorResponse | any) {
        return throwError(err.message || 'Error: Unable to complete request.');
    }

    getUsers(): Observable<User[]> {
        return this.http
            .get<User[]>(environment.API_URL + '/auth/users/')
            .catch(UserService._handleError);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.API_URL}/login/users`)
            .catch(UserService._handleError);
    }

    getCurrentUser() {
        return this.http.get<User>(`${environment.API_URL}/user/current`)
            .catch(UserService._handleError);
    }

    getById(id: number) {
        return this.http.get(`${environment.API_URL}/login/users/` + id)
            .catch(UserService._handleError);
    }

    register(user: any) {
        return this.http.post(`${environment.API_URL}/user/register`, user,
            { headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
            .catch(UserService._handleError);
    }

    update(user: User) {
        return this.http.put(`${environment.API_URL}/login/users/` + user.id, user)
            .catch(UserService._handleError);
    }

    delete(id: number) {
        return this.http.delete(`${environment.API_URL}/login/users/` + id)
            .catch(UserService._handleError);
    }
}
