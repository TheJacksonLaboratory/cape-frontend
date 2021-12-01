import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Parameters } from '../_models/parameters';
import { DataFile } from '../_models/datafile';
import { Phenotype } from '../_models/phenotype';
import { PhenotypeValue } from '../_models/phenotype-value';


@Injectable({ providedIn: 'root' })
export class DataFilesService {

    // Used to send data from data file table to parameter ui
    parametersDataSubject = new Subject<Parameters>();

    // used to hold the updated phenotype list
    phenotypesSubject = new Subject<Phenotype[]>();

    // used to hold the selected datafile
    selectedDataFileSubject = new Subject<DataFile>();

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
    deleteParameterDataFile(paramId: number, userId: number) {
        return this.http.post<any>(environment.PARAMETERS_URL + '/delete_parameter_file',
            { 'param_id': paramId, 'user_id': userId }, this.httpOptions)
            .pipe(map(file => {
                const jsonString = JSON.stringify(file);
                const jsonObj = JSON.parse(jsonString);
                return jsonObj;
            })).catch(DataFilesService._handleError);
    }

    /**
     * Delete a data file given its  id and user id
     * @param dataFileId datafile id
     * @param userId user id
     */
    deleteDataFile(dataFileId: number, userId: number) {
        return this.http.post<any>(environment.DATA_FILE_URL + '/delete_datafile',
            { 'datafile_id': dataFileId, 'user_id': userId }, this.httpOptions)
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
        return this.http.get<DataFile[]>(environment.DATA_FILE_URL + '/get_datafiles')
            .catch(DataFilesService._handleError);
    }

    /**
     * Get the list of data files
     */
    getDataFilesAndParameters(): Observable<DataFile[]> {
        return this.http.get<DataFile[]>(environment.DATA_FILE_URL + '/get_datafiles_parameters')
            .catch(DataFilesService._handleError);
    }

    /**
     * Get the list of parameter files
     */
    getParameterFiles(): Observable<Parameters[]> {
        return this.http.get<Parameters[]>(environment.PARAMETERS_URL + '/get_parameter_files')
            .catch(DataFilesService._handleError);
    }

    /**
     * Gets the list of phenotypes per data file
     * @param dataFileId Returns the list of phenotypes per datafile
     */
    getPhenotypesPerDataFile(dataFileId: number) {
        const params = new HttpParams().set('datafile_id', String(dataFileId));
        return this.http.get<Phenotype[]>(environment.DATA_FILE_URL + '/get_phenotypes', { params: params })
            .catch(DataFilesService._handleError);
    }

    /**
     * Returns the list of parameter files for a data file id
     * @param datafileId
     */
    getParameterFilesPerDataFile(datafileId: number): any {
        let params = new HttpParams();
        params = params.append('datafile_id', String(datafileId));
        return this.http.get<Parameters[]>(environment.DATA_FILE_URL + '/get_parameter_files', { params: params })
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

        return this.http.get<Parameters>(environment.PARAMETERS_URL + '/get_parameter_file', { params: params })
            .catch(DataFilesService._handleError);
    }

    /**
     * Get all values for the given phenotype of a datafile
     * @param dataFileId
     * @param phenotypeName
     */
    getPhenotypeValues(dataFileId: number, phenotypeName: string): Observable<PhenotypeValue[]> {
        let params = new HttpParams();
        params = params.append('datafile_id', String(dataFileId));
        params = params.append('phenotype_name', String(phenotypeName));
        return this.http.get<PhenotypeValue[]>(environment.DATA_FILE_URL + '/get_phenotype_values', { params: params })
            .catch(DataFilesService._handleError);
    }

    /**
     * Get the Pearson Coefficients matrix for the given phenotypes
     * @param dataFileId datafile id
     * @param phenotypeNames array of phenotype names in order
     */
    getPhenotypesCorrelations(dataFileId: number, phenotypeNames: string[]): any {
        let params = new HttpParams();
        params = params.append('datafile_id', String(dataFileId));
        let names: string;
        for (const name of phenotypeNames) {
            names = names !== undefined ? names + ',' + name : name;
        }
        params = params.append('phenotype_names', String(names));
        return this.http.get<any>(environment.DATA_FILE_URL + '/get_pearson_coefficients', { params: params })
            .catch(DataFilesService._handleError);
    }

    /**
     * Sets the selected Datafile
     * @param selectedDataFile data file
     */
    setSelectedDataFile(selectedDataFile: DataFile) {
        this.selectedDataFileSubject.next(selectedDataFile);
    }

    /**
     * Returns the selected DataFile
     */
    getSelectedDataFile(): Observable<DataFile> {
        return this.selectedDataFileSubject.asObservable();
    }

    public isThereFileChanges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    uploadDataFile(file: File, fileType: string, status: { [key: string]: { progress: Observable<any> } }): { [key: string]: { progress: Observable<any> } } {

        if (status == null || status == undefined) {
            status = {};
        }
        // create a new multipart-form for every file
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        // create a http-post request and pass the form
        // tell it to report the upload progress
        const req = new HttpRequest('POST', environment.DATA_FILE_URL + '/add_datafile', formData, {
            reportProgress: true
        });

        // create a new progress-subject for every file
        const progress = new Subject<any>();


        // this.http.request(req)


        // send the http-request and subscribe for progress-updates
        this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {

                // calculate the progress percentage
                const percentDone = Math.round(100 * event.loaded / event.total);

                // pass the percentage into the progress-stream
                progress.next({ percentDone: percentDone });
            } else if (event instanceof HttpResponse) {

                console.log(event.body)
                // Close the progress-stream if we get an answer form the API
                // The upload is complete
                progress.next({ data: event.body });
                progress.complete();
            }

            // console.log(event.status)
            //   console.log(event.type);
        }, error => {
            progress.error(error)
        },
            () => {
                console.log('end');
            });

        // Save every progress-observable in a map of all observables
        status[file.name] = {
            progress: progress.asObservable()
        };
        return status;
    }

    errorHandler(error: HttpErrorResponse) {
        console.log('error handler')
        //console.log (error)

        return Observable.throwError(error.message || 'Server Error');
    }

    uploadWithProgress(files: any): Observable<any> {
        const formData = new FormData();
        Array.prototype.forEach.call(files, file => formData.append('files[]', file, file.name));
        this.httpOptions = {
            headers: new HttpHeaders({ 'Authorization': 'currentUser' }),
            params: new HttpParams(),
            observe: 'events',
            reportProgress: true
        };
        return this.http.post<any>(environment.DATA_FILE_URL + '/add_datafile', formData, this.httpOptions);
    }
}
