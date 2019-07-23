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
     * Create and run a job given its parameter id
     * @param paramFileId parameter id
     */
    createRunJob(paramFileId: number) {
        return this.http.post<any>(environment.API_URL + '/jobs/create_run',
            { 'parameter_file_id': paramFileId}, this.httpOptions)
            .pipe(map(file => {
                const jsonString = JSON.stringify(file);
                const jsonObj = JSON.parse(jsonString);
                return jsonObj;
            })).catch(JobService._handleError);
    }

    /**
     * Delete a job given its id
     * @param jobId job id
     */
    runJob(jobId: number) {
        return this.http.post<any>(environment.API_URL + '/jobs/run',
            { 'job_id': jobId }, this.httpOptions)
            .pipe(map(file => {
                const jsonString = JSON.stringify(file);
                const jsonObj = JSON.parse(jsonString);
                return jsonObj;
            })).catch(JobService._handleError);
    }

    /**
     * Delete a job given its id
     * @param jobId job id
     */
    deleteJob(jobId: number) {
        return this.http.post<any>(environment.API_URL + '/jobs/delete',
            { 'job_id': jobId }, this.httpOptions)
            .pipe(map(file => {
                const jsonString = JSON.stringify(file);
                const jsonObj = JSON.parse(jsonString);
                return jsonObj;
            })).catch(JobService._handleError);
    }

    /**
     * Cancel a job given its id
     * @param jobId job id
     */
    cancelJob(jobId: number) {
        return this.http.post<any>(environment.API_URL + '/jobs/cancel',
            { 'job_id': jobId }, this.httpOptions)
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
