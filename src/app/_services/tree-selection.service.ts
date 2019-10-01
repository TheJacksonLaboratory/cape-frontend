import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, AsyncSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TreeSelectionService {

    private traitSelectionSource = new BehaviorSubject<Set<string>>(null);
    private covariateSelectionSource = new BehaviorSubject<Set<string>>(null);

    setTraitSelected(traits: Set<string>) {
        this.traitSelectionSource.next(traits);
    }
    setCovariateSelected(covariates: Set<string>) {
        this.covariateSelectionSource.next(covariates);
    }

    getTraitSelected(): Observable<Set<string>> {
        return this.traitSelectionSource;
    }
    getCovariateSelected(): Observable<Set<string>> {
        return this.covariateSelectionSource;
    }
}
