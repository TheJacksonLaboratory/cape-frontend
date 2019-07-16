import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Parameters } from '../_models/parameters';
import { DataFile } from '../_models/datafile';
import { Phenotype } from '../_models/phenotype';


@Injectable({ providedIn: 'root' })
export class DataFilesService {

    // Used to send data from data file table to parameter ui
    parametersDataSubject = new Subject<Parameters>();

    // used to hold the updated phenotype list
    phenotypesSubject = new Subject<Phenotype[]>();

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

    setPhenotypes(phenotypes: Phenotype[]) {
        this.phenotypesSubject.next(phenotypes);
    }

    getPhenotypes(): Observable<Phenotype[]> {
        return this.phenotypesSubject.asObservable();
    }
    /**
     * Delete a parameter file given its parameter id and user id
     * @param paramId parameter id
     * @param userId user id
     */
    deleteDataFile(paramId: number, userId: number) {
        return this.http.post<any>(environment.API_URL + '/parameters/delete_parameter_file',
            { 'param_id': paramId, 'user_id': userId }, this.httpOptions)
            .pipe(map(file => {
                const jsonString = JSON.stringify(file);
                const jsonObj = JSON.parse(jsonString);
                return jsonObj;
            })).catch(DataFilesService._handleError);
    }

    /**
     * Get the list of data files
     */
    getDataFiles(): Observable<DataFile[]> {
        return this.http.get<DataFile[]>(environment.API_URL + '/datafiles/get_datafiles')
            .catch(DataFilesService._handleError);
    }

    /**
     * Get the list of data files
     */
    getDataFilesAndParameters(): Observable<DataFile[]> {
        return this.http.get<DataFile[]>(environment.API_URL + '/datafiles/get_datafiles_parameters')
            .catch(DataFilesService._handleError);
    }
  
    /**
     * Get the list of parameter files
     */
    getParameterFiles(): Observable<Parameters[]> {
        return this.http.get<Parameters[]>(environment.API_URL + '/parameters/get_parameter_files')
            .catch(DataFilesService._handleError);
    }

    /**
     * 
     * @param dataFileId Returns the list of phenotypes per datafile
     */
    getPhenotypesPerDataFile(dataFileId: number) {
        const params = new HttpParams().set('datafile_id', String(dataFileId));
        return this.http.get<Phenotype[]>(environment.API_URL + '/datafiles/get_phenotypes', { params: params})
                        .catch(DataFilesService._handleError);
    }

    /**
     * Returns the list of parameter files for a data file id
     * @param datafileId
     */
    getParameterFilesPerDataFile(datafileId: number): any {
        let params = new HttpParams();
        params = params.append('datafile_id', String(datafileId));
        return this.http.get<Parameters[]>(environment.API_URL + '/datafiles/get_parameter_files', { params: params})
                        .catch(DataFilesService._handleError);
    }

    /**
     * Get a parameter file given its parameter id
     * @param paramId parameter id
     */
    getParameterFile(paramId: number, dataFileId: number): Observable<Parameters> {
        let params = new HttpParams();
        params = params.append('param_id', String(paramId));
        params = params.append('datafile_id', String(dataFileId));

        return this.http.get<Parameters>(environment.API_URL + '/parameters/get_parameter_file', { params: params })
                        .catch(DataFilesService._handleError);
    }

}
