import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ParametersService } from 'src/app/_services';
import { Documentation } from '../documentation';
import { Parameters } from '../../_models/parameters';

@Component({
  selector: 'app-pair-scan',
  templateUrl: './pair-scan.component.html',
  styleUrls: ['./pair-scan.component.scss']
})
export class PairScanComponent implements OnInit, OnDestroy {

  markerPairConstraints = ['Maximum Marker Correlation', 'Minimum Individuals per Genotype'];

  // parameters
  nullSize = 1500000;
  markerPairConstraint: string;
  maxMarkerCorrelation = 0.1;
  minIndPerGenotype = 5;

  documentation = Documentation.PAIR_SCAN_DOC;

  parametersSubscription: Subscription;
  parameters: Parameters;

  constructor(private parametersService: ParametersService) {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
    });
  }

  ngOnInit() {
    this.setNullSize();
  }
  ngOnDestroy(): void {
    this.parametersSubscription.unsubscribe();
  }

  setNullSize() {
    this.parameters.ps_null_size = this.nullSize;
  }
  setMarkerPairConstraints() {
    this.parameters.ps_marker_pair_constraints = this.markerPairConstraint;
    // We initialize the max marker correlation and min individual per Genotype as the input fields have already a default value
    if (this.markerPairConstraint === this.markerPairConstraints[0]) {
      this.parameters.ps_max_marker_correlation = this.maxMarkerCorrelation;
      this.parameters.ps_min_individual_per_genotype = undefined;
    } else if (this.markerPairConstraint === this.markerPairConstraints[1]) {
      this.parameters.ps_max_marker_correlation = undefined;
      this.parameters.ps_min_individual_per_genotype = this.minIndPerGenotype;
    }
  }
  setMaxMarkerCorrelation() {
    this.parameters.ps_max_marker_correlation = this.maxMarkerCorrelation;
  }
  setMinIndPerGenotype() {
    this.parameters.ps_min_individual_per_genotype = this.minIndPerGenotype;
  }
}
