import { Injectable } from '@angular/core';
import { REPORTS } from './reports.mock';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Job, Report } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  // http options used for making API calls
  private httpOptions: any;
  reports = REPORTS['0']['data'];

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'currentUser' })
    };
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  /**
   * Returns the reports owner (user Full name)
   * @param reportId id of report
   */
  getReportOwner(reportId: number) {
    const params = new HttpParams().set('job_id', String(reportId));
    return this.http.get<Job[]>(environment.API_URL + '/reports/get_owner', { params: params })
      .catch(ReportsService._handleError);
  }

  /**
   * Get the list of reports
   */
  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(environment.API_URL + '/reports/get_all')
      .catch(ReportsService._handleError);
  }

 /**
  * Get Report for report id
  */
  getReport(reportId: number) {
    const params = new HttpParams().set('id', String(reportId));
    return this.http.get<Report>(environment.API_URL + '/reports/get', { params: params })
      .catch(ReportsService._handleError);
  }

 /**
  * Get Report for given job id
  */
 getReportByJobId(jobId: number) {
  const params = new HttpParams().set('job_id', String(jobId));
  return this.http.get<Report>(environment.API_URL + '/reports/get', { params: params })
    .catch(ReportsService._handleError);
}

   /**
  * Get files for Report with report id
  */
 getFiles(reportId: number) {
  const params = new HttpParams().set('report_id', String(reportId));
  return this.http.get(environment.API_URL + '/files', { params: params })
    .catch(ReportsService._handleError);
}
}
