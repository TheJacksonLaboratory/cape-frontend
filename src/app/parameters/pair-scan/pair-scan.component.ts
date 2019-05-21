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
    this.parameters.psNullSize = this.nullSize;
  }
  setMarkerPairConstraints() {
    this.parameters.psMarkerPairConstraints = this.markerPairConstraint;
    // We initialize the max marker correlation and min individual per Genotype as the input fields have already a default value
    if (this.markerPairConstraint === this.markerPairConstraints[0]) {
      this.parameters.psMaxMarkerCorrelation = this.maxMarkerCorrelation;
      this.parameters.psMinIndividualPerGenotype = undefined;
    } else if (this.markerPairConstraint === this.markerPairConstraints[1]) {
      this.parameters.psMaxMarkerCorrelation = undefined;
      this.parameters.psMinIndividualPerGenotype = this.minIndPerGenotype;
    }
  }
  setMaxMarkerCorrelation() {
    this.parameters.psMaxMarkerCorrelation = this.maxMarkerCorrelation;
  }
  setMinIndPerGenotype() {
    this.parameters.psMinIndividualPerGenotype = this.minIndPerGenotype;
  }
}
