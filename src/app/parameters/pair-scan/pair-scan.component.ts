import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { ParametersService } from 'src/app/_services';
import { Documentation } from '../documentation';
import { Parameters } from '../../_models/parameters';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pair-scan',
  templateUrl: './pair-scan.component.html',
  styleUrls: ['./pair-scan.component.scss']
})
export class PairScanComponent implements OnInit, OnDestroy {

  markerPairConstraints = ['Maximum Marker Correlation', 'Minimum Individuals per Genotype'];

  // parameters
  nullSize = 1000;
  markerPairConstraint: string;
  maxMarkerCorrelation = 0.1;
  minIndPerGenotype = 5;

  documentation = Documentation.PAIR_SCAN_DOC;

  routeSubscription: Subscription;
  parametersSubscription: Subscription;
  parameters: Parameters;

  constructor(private parametersService: ParametersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
      // populate parameter ui if there is a parameter obj sent to the service
      if (this.parameters !== undefined) {
        this.nullSize = this.parameters.ps_null_size !== undefined ? this.parameters.ps_null_size : this.nullSize;
        this.maxMarkerCorrelation = this.parameters.ps_max_marker_correlation !== undefined
                        ? this.parameters.ps_max_marker_correlation : this.maxMarkerCorrelation;
        this.minIndPerGenotype = this.parameters.ps_min_individual_per_genotype !== undefined
                        ? this.parameters.ps_min_individual_per_genotype : this.minIndPerGenotype;
        // set default
        this.parameters.ps_null_size = this.parameters.ps_null_size === undefined ? this.nullSize : this.parameters.ps_null_size;
      }
    });
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.parametersService.setParameters(Parameters.parse(params));
    });
    // set default
    this.setNullSize();
  }
  ngOnDestroy(): void {
    this.parametersSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  setNullSize() {
    if (this.parameters !== undefined) {
      this.parameters.ps_null_size = this.nullSize;
    }
  }
  setMarkerPairConstraints() {
    if (this.parameters !== undefined) {
      // We initialize the max marker correlation and min individual per Genotype as the input fields have already a default value
      if (this.markerPairConstraint === this.markerPairConstraints[0]) {
        this.parameters.ps_max_marker_correlation = this.maxMarkerCorrelation;
        this.parameters.ps_min_individual_per_genotype = undefined;
      } else if (this.markerPairConstraint === this.markerPairConstraints[1]) {
        this.parameters.ps_max_marker_correlation = undefined;
        this.parameters.ps_min_individual_per_genotype = this.minIndPerGenotype;
      }
    }
  }
  setMaxMarkerCorrelation() {
    if (this.parameters !== undefined) {
      this.parameters.ps_max_marker_correlation = this.maxMarkerCorrelation;
    }
  }
  setMinIndPerGenotype() {
    if (this.parameters !== undefined) {
      this.parameters.ps_min_individual_per_genotype = this.minIndPerGenotype;
    }
  }
}
