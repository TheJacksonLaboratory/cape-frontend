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
     * Returns the job owner (user Full name)
     * @param jobId id of job
     */
    getJobOwner(jobId: number) {
        const params = new HttpParams().set('id', String(jobId));
        return this.http.get<Job[]>(environment.JOB_URL + '/get_owner', { params: params })
            .catch(JobService._handleError);
    }

    /**
     * Create and run a job given its parameter id
     * @param paramFileId parameter id
     */
    createRunJob(paramFileId: number) {
        return this.http.post<any>(environment.JOB_URL + '/create_run',
            { 'parameter_file_id': paramFileId }, this.httpOptions)
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
        return this.http.post<any>(environment.JOB_URL + '/run',
            { 'id': jobId }, this.httpOptions)
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
        return this.http.post<any>(environment.JOB_URL + '/delete',
            { 'id': jobId }, this.httpOptions)
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
        return this.http.post<any>(environment.JOB_URL + '/cancel',
            { 'id': jobId }, this.httpOptions)
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
    getJobProgress(jobId: number) {
        const params = new HttpParams().set('id', String(jobId));
        return this.http.get(environment.JOB_URL + '/progress', { params: params })
            .catch(JobService._handleError);
    }

    /**
     * Get the list of jobs
     */
    getJobs(): Observable<Job[]> {
        return this.http.get<Job[]>(environment.JOB_URL + '/get_all')
            .catch(JobService._handleError);
    }


}
