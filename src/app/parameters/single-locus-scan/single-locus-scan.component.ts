import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ParametersService } from 'src/app/_services';
import { Documentation } from '../documentation';
import { Parameters } from '../../_models/parameters';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-single-locus-scan',
  templateUrl: './single-locus-scan.component.html',
  styleUrls: ['./single-locus-scan.component.scss']
})
export class SingleLocusScanComponent implements OnInit, OnDestroy {

  // parameters
  referenceAllele = 'A';
  numberOfPermutations = 0;
  useKinship = false;

  // alpha
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  alphaValues: string[] = [ '0.05', '0.01' ];

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
        // this.kinshipType = this.parameters.sls_kinship_type !== undefined ? this.parameters.sls_kinship_type : this.kinshipType;
        //alpha
        let alphaValuesTmp = this.parameters.sls_alpha_values !== undefined ? this.parameters.sls_alpha_values : this.alphaValues;
        if (typeof alphaValuesTmp == 'string') {
          this.alphaValues = (<string>alphaValuesTmp).split(',');
        }
        // set default
        this.parameters.sls_reference_allele = this.parameters.sls_reference_allele === undefined ? this.referenceAllele
                                                : this.parameters.sls_reference_allele;
        this.parameters.sls_number_of_permutations = this.parameters.sls_number_of_permutations === undefined ? this.numberOfPermutations
                                                : this.parameters.sls_number_of_permutations;
        this.parameters.sls_use_kinship = this.parameters.sls_use_kinship === undefined ? this.useKinship : this.parameters.sls_use_kinship;
        this.parameters.sls_alpha_values = this.parameters.sls_alpha_values === undefined ? this.alphaValues : this.parameters.sls_alpha_values;
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
  }
  setAlphaValues() {
    this.parameters.sls_alpha_values = this.alphaValues;
  }

  addAlpha(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our alpha
    var numberValue = parseFloat(value);
    const idx = this.alphaValues.indexOf(value);
    if ((numberValue !== NaN  && value !== '' && idx == -1)) {
      this.alphaValues.push(value);
      this.setAlphaValues();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeAlpha(alpha: string): void {
    const index = this.alphaValues.indexOf(alpha);

    if (index >= 0) {
      this.alphaValues.splice(index, 1);
    }
    for(let i = 0; i < this.alphaValues.length; i++) {
      console.log(this.alphaValues[i]);
    }
  }

}
