import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Parameters } from 'src/app/_models';


@Injectable({ providedIn: 'root' })
export class ParametersService {

  // http options used for making API calls
  private httpOptions: any;

  private parametersSubject = new Subject<Parameters>();

  private paramFileIdxSubject = new Subject<number>();

  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'currentUser' })
    };
  }

  setParameters(parameters: Parameters) {
    this.parametersSubject.next(parameters);
  }
  getParameters() {
    return this.parametersSubject.asObservable();
  }

  setParameterFileIdxSelected(fileIdxSelected: number) {
    this.paramFileIdxSubject.next(fileIdxSelected);
  }
  getParameterFileIdxSelected(): Observable<any> {
    return this.paramFileIdxSubject.asObservable();
  }

  /**
   * Create a parameter file with the given parameter object
   * @param parameters parameter file
   */
  createParameterFile(parameters: Parameters) {
    return this.http.post<any>(environment.API_URL + '/user/create_parameter_file', { parameters }, this.httpOptions)
      .pipe(map(file => {
        // login successful if there's a jwt token in the response
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const jsonString = JSON.stringify(file);
        const jsonObj = JSON.parse(jsonString);
        return jsonObj;
      }));
  }

}
