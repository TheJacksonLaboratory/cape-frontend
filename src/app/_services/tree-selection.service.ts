import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TreeSelectionService {

    // Observable checkedNodes sources
    private traitSelectionSource = new Subject<Set<string>>();
    private covariabteSelectionSource = new Subject<Set<string>>();

    setTraitSelected(traits: Set<string>) {
        this.traitSelectionSource.next(traits);
    }
    setCovariateSelected(covariates: Set<string>) {
        this.covariabteSelectionSource.next(covariates);
    }

    getTraitSelected(): Observable<Set<string>> {
        return this.traitSelectionSource.asObservable();
    }
    getCovariateSelected(): Observable<Set<string>> {
        return this.covariabteSelectionSource.asObservable();
    }
}