import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Parameters } from 'src/app/_models';

@Injectable({ providedIn: 'root' })
export class ParametersService {
  private parametersSubject = new Subject<Parameters>();

  private paramFileIdxSubject = new Subject<number>();

  constructor() {}

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

}
