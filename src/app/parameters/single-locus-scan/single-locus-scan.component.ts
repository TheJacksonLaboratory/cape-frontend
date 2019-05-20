import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ParametersService } from 'src/app/_services';
import { Documentation } from '../documentation';
import { Parameters } from '../../_models/parameters';

@Component({
  selector: 'app-single-locus-scan',
  templateUrl: './single-locus-scan.component.html',
  styleUrls: ['./single-locus-scan.component.scss']
})
export class SingleLocusScanComponent implements OnInit, OnDestroy {

  referenceAllele = 'A';
  numberOfPermutations = 1;
  useKinship = false;
  kinshipType: string;
  kinshipTypes = [ 'Overall', 'LTCO' ];

  documentation = Documentation.SINGLE_LOCUS_SCAN_DOC;

  parametersSubscription: Subscription;
  parameters: Parameters;

  constructor(private parametersService: ParametersService) {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
    });
  }

  ngOnInit() {
    this.parameters.slsReferenceAllele = this.referenceAllele;
    this.parameters.slsNumberOfPermutations = this.numberOfPermutations;
    this.parameters.slsUseKinship = this.useKinship;
  }
  ngOnDestroy(): void {
    this.parametersSubscription.unsubscribe();
  }
  setReferenceAllele() {
    this.parameters.slsReferenceAllele = this.referenceAllele;
  }
  setNumberOfPermutations() {
    this.parameters.slsNumberOfPermutations = this.numberOfPermutations;
  }
  setUseKinship() {
    this.parameters.slsUseKinship = !this.useKinship;
    if (this.useKinship) {  // if the useKinship checkbox is unchecked we reset the kinshipType
      this.parameters.slsKinshipType = undefined;
    }
  }
  setKinshipType() {
    this.parameters.slsKinshipType = this.kinshipType;
  }
}
