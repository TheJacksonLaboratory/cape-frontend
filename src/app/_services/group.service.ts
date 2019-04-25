import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Group } from '../_models/group';

@Injectable({ providedIn: 'root' })
export class GroupService {
    private base_url: string = environment.API_URL + '/user/groups';

    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);

    constructor(private http: HttpClient) { }

    private static _handleError(err: HttpErrorResponse | any) {
        return throwError(err.message || 'Error: Unable to complete request.');
    }

    getGroups(): Observable<Group[]> {
        return this.http.get<Group[]>(this.base_url)
            .catch(GroupService._handleError);
    }


    /** data to display in table */
    get data(): Group[] {
        return this.dataChange.value;
    }

    /**
     * add new group data to our list of groups
     * @param data: list of groups to add
     * */
    public updateData(data: Group[]) {
        const copiedData = this.data.slice();
        copiedData.concat(data);
        this.dataChange.next(copiedData);
    }

    /** set data to new list of groups */
    public setData(data: Group[]) {
        this.dataChange.next(data);
    }

    /**
   * get a row index from a group ID
   * @param id id of group to find
   * @param data table data, if null will use this.data
   * @returns index of row with given group id
   */
    public indexFromId(id: number, data: Group[] = null) {
        const thisData = (data !== null) ? data : this.data;
        return thisData.findIndex(row => +row.id === id);
    }

    /**
     * remove a row from the table data
     * @param id ID of group to remove
     */
    public deleteRow(id) {
        const data = this.data,
            idx = this.indexFromId(+id, data);
        data.splice(idx, 1);
        this.setData(data);
    }
}
