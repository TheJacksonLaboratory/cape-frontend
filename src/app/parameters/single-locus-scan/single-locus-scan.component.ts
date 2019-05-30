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

  // parameters
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
    this.parameters.sls_reference_allele = this.referenceAllele;
    this.parameters.sls_number_of_permutations = this.numberOfPermutations;
    this.parameters.sls_use_kinship = this.useKinship;
  }
  ngOnDestroy(): void {
    this.parametersSubscription.unsubscribe();
  }
  setReferenceAllele() {
    this.parameters.sls_reference_allele = this.referenceAllele;
  }
  setNumberOfPermutations() {
    this.parameters.sls_number_of_permutations = this.numberOfPermutations;
  }
  setUseKinship() {
    this.parameters.sls_use_kinship = !this.useKinship;
    if (this.useKinship) {  // if the useKinship checkbox is unchecked we reset the kinshipType
      this.parameters.sls_kinship_type = undefined;
    }
  }
  setKinshipType() {
    this.parameters.sls_kinship_type = this.kinshipType;
  }
}
