import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';
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
    deleteDataFile(paramId: number, userId: number) {
        return this.http.post<any>(environment.PARAMETERS_URL + '/delete_parameter_file',
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
        return this.http.get<Phenotype[]>(environment.DATA_FILE_URL + '/get_phenotypes', { params: params})
                        .catch(DataFilesService._handleError);
    }

    /**
     * Returns the list of parameter files for a data file id
     * @param datafileId
     */
    getParameterFilesPerDataFile(datafileId: number): any {
        let params = new HttpParams();
        params = params.append('datafile_id', String(datafileId));
        return this.http.get<Parameters[]>(environment.DATA_FILE_URL + '/get_parameter_files', { params: params})
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
}
