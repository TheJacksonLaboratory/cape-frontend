import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Parameters } from '../_models/parameters';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataFilesService {
    // http options used for making API calls
    private httpOptions: any;

    constructor(private http: HttpClient, private router: Router) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'currentUser' })
        };
    }

    private static _handleError(err: HttpErrorResponse | any) {
        return throwError(err.message || 'Error: Unable to complete request.');
    }

    /**
     * Create a parameter file from the data file listing
     */
    createDataFile() {

    }

    /**
     * Delete a parameter file given its parameter id and user id
     * @param paramId parameter id
     * @param userId user id
     */
    deleteDataFile(paramId: number, userId: number) {
        return this.http.post<any>(environment.API_URL + '/user/delete_parameter_file',
            { 'param_id': paramId, 'user_id': userId }, this.httpOptions)
            .pipe(map(file => {
                const jsonString = JSON.stringify(file);
                const jsonObj = JSON.parse(jsonString);
                return jsonObj;
            })).catch(DataFilesService._handleError);
    }

    /**
     * Get the list of parameter files
     */
    getDataFiles(): Observable<Parameters[]> {
        return this.http.get<Parameters[]>(environment.API_URL + '/user/get_parameter_files')
            .catch(DataFilesService._handleError);
    }

    /**
     * Get a parameter file given its parameter id and the user id
     * @param paramId parameter id
     * @param userId user id
     */
    getParameterFile(paramId: number, userId: number): Observable<Parameters> {
        return this.http.post<any>(environment.API_URL + '/user/get_parameter_file',
            { 'param_id': paramId, 'user_id': userId }, this.httpOptions)
            .pipe(map(file => {
                const jsonString = JSON.stringify(file);
                const jsonObj = JSON.parse(jsonString);
                return jsonObj;
            })).catch(DataFilesService._handleError);
    }

 }
