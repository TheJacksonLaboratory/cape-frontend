import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ParametersService {

    private subject = new Subject<any>();

    setParameterFileIdxSelected(fileIdxSelected: number) {
      this.subject.next(fileIdxSelected);
    }

    getParameterFileIdxSelected(): Observable<any> {
        return this.subject.asObservable();
    }
}
