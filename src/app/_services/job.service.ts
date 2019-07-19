import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Job } from '../_models/job';


@Injectable({ providedIn: 'root' })
export class JobService {

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

    /**
     * Delete a parameter file given its parameter id and user id
     * @param jobId job id
     * @param userId user id
     */
    runJob(jobId: number, userId: number) {
        return this.http.post<any>(environment.API_URL + '/jobs/run_job',
            { 'job_id': jobId, 'user_id': userId }, this.httpOptions)
            .pipe(map(file => {
                const jsonString = JSON.stringify(file);
                const jsonObj = JSON.parse(jsonString);
                return jsonObj;
            })).catch(JobService._handleError);
    }

    /**
     * Delete a parameter file given its parameter id and user id
     * @param jobId job id
     * @param userId user id
     */
    deleteJob(jobId: number, userId: number) {
        return this.http.post<any>(environment.API_URL + '/jobs/delete_job',
            { 'job_id': jobId, 'user_id': userId }, this.httpOptions)
            .pipe(map(file => {
                const jsonString = JSON.stringify(file);
                const jsonObj = JSON.parse(jsonString);
                return jsonObj;
            })).catch(JobService._handleError);
    }

    /**
     * Get the list of jobs
     */
    getJobs(): Observable<Job[]> {
        return this.http.get<Job[]>(environment.API_URL + '/jobs/get_all')
            .catch(JobService._handleError);
    }


}
