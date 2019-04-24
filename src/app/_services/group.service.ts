import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Group } from '../_models/group';

@Injectable({ providedIn: 'root' })
export class GroupService {
    private base_url: string = environment.API_URL + '/user/groups';

    constructor(private http: HttpClient) { }

    private static _handleError(err: HttpErrorResponse | any) {
        return throwError(err.message || 'Error: Unable to complete request.');
    }

    getGroups(): Observable<Group[]> {
        return this.http.get<Group[]>(this.base_url)
        .catch(GroupService._handleError);
    }
}
