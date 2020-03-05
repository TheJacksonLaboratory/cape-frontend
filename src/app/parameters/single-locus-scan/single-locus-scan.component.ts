import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ParametersService } from 'src/app/_services';
import { Documentation } from '../documentation';
import { Parameters } from '../../_models/parameters';
import { ActivatedRoute } from '@angular/router';

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

  kinshipTypes = [ 'overall', 'ltco' ];

  documentation = Documentation.SINGLE_LOCUS_SCAN_DOC;

  routeSubscription: Subscription;
  parametersSubscription: Subscription;
  parameters: Parameters;

  constructor(private parametersService: ParametersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
      // populate parameter ui if there is a parameter obj sent to the service
      if (this.parameters !== undefined) {
        this.referenceAllele = this.parameters.sls_reference_allele !== undefined ? this.parameters.sls_reference_allele
                      : this.referenceAllele;
        this.numberOfPermutations = this.parameters.sls_number_of_permutations !== undefined ? this.parameters.sls_number_of_permutations
                      : this.numberOfPermutations;
        this.useKinship = this.parameters.sls_use_kinship !== undefined ? this.parameters.sls_use_kinship : this.useKinship;
        this.kinshipType = this.parameters.sls_kinship_type !== undefined ? this.parameters.sls_kinship_type : this.kinshipType;
        // set default
        this.parameters.sls_reference_allele = this.parameters.sls_reference_allele === undefined ? this.referenceAllele
                                                : this.parameters.sls_reference_allele;
        this.parameters.sls_number_of_permutations = this.parameters.sls_number_of_permutations === undefined ? this.numberOfPermutations
                                                : this.parameters.sls_number_of_permutations;
        this.parameters.sls_use_kinship = this.parameters.sls_use_kinship === undefined ? this.useKinship : this.parameters.sls_use_kinship;
      }
    });
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.parametersService.setParameters(Parameters.parse(params));
    });
  }
  ngOnDestroy(): void {
    this.parametersSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
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
