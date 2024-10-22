import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'src/environments/environment';

const urlVcfFile = environment.DATA_FILE_URL + '/add_file';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url = '';
  paramName = ''
  public isThereFileChanges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isThereSampleChanges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  public uploadFiles(files: Set<File>, fileType: string): { [key: string]: { progress: Observable<any> } } {

    this.setCall(fileType)
    // this will be the our resulting map
    let status: { [key: string]: { progress: Observable<any> } } = {};

    files.forEach(file => {
      status = this.uploadFile(file, fileType, status);
    });

    // return the map of progress.observables
    return status;
  }

  public uploadFile(file: File, fileType: string, status: { [key: string]: { progress: Observable<any> } }): { [key: string]: { progress: Observable<any> } } {

    if (status == null || status == undefined) {
      status = {};
    }
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(this.paramName, file, file.name);

    // create a http-post request and pass the form
    // tell it to report the upload progress
    const req = new HttpRequest('POST', environment.DATA_FILE_URL + '/add_file', formData, {
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

  private setCall(fileType: string) {
    if (fileType === 'vcf') {
      this.url = urlVcfFile;
      this.paramName = 'vcfFile';
    }
  }

}
