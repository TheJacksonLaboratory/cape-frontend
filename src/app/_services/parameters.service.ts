import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Parameters } from 'src/app/_models';
import { DataFile } from '../_models/datafile';


@Injectable({ providedIn: 'root' })
export class ParametersService {

  // http options used for making API calls
  private httpOptions: any;

  private parametersSubject = new Subject<Parameters>();

  private dataFileSubject = new Subject<DataFile>();

  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'currentUser' })
    };
  }

  setParameters(parameters: Parameters) {
    this.parametersSubject.next(parameters);
  }
  getParameters(): Observable<Parameters> {
    return this.parametersSubject.asObservable();
  }

  setDataFileSelected(dataFileSelected: DataFile) {
    this.dataFileSubject.next(dataFileSelected);
  }
  getDataFileSelected(): Observable<DataFile> {
    return this.dataFileSubject.asObservable();
  }

  /**
   * Save (create or update) a parameter file with the given parameter object
   * @param parameters parameter file
   */
  saveParameterFile(parameters: Parameters) {
    return this.http.post<any>(environment.PARAMETERS_URL + '/save_parameter_file', { parameters }, this.httpOptions)
      .pipe(map(file => {
        // login successful if there's a jwt token in the response
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const jsonString = JSON.stringify(file);
        const jsonObj = JSON.parse(jsonString);
        return jsonObj;
      }));
  }

}
