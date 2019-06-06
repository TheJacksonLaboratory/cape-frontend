import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Parameters } from '../_models/parameters';


@Injectable({ providedIn: 'root' })
export class DataFilesService {

    // Used to send data from data file table to parameter ui
    parametersDataSubject = new Subject<Parameters>();

    // http options used for making API calls
    private httpOptions: any;

    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'currentUser' })
        };
    }

    private static _handleError(err: HttpErrorResponse | any) {
        return throwError(err.message || 'Error: Unable to complete request.');
    }

    setParametersData(parameters: Parameters) {
        this.parametersDataSubject.next(parameters);
    }
    getParametersData() {
        return this.parametersDataSubject.asObservable();
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
