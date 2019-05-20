import { Component, OnInit } from '@angular/core';
import { ParametersService } from 'src/app/_services';
import { Documentation } from '../documentation';

@Component({
  selector: 'app-pair-scan',
  templateUrl: './pair-scan.component.html',
  styleUrls: ['./pair-scan.component.scss']
})
export class PairScanComponent implements OnInit {

  markerPairConstraints = ['Maximum Marker Correlation', 'Minimum Individuals per Genotype'];

  nullSize = 1500000;
  markerPairConstraint: string;
  maxMarkerCorrelation = 0.1;
  minIndPerGenotype = 5;

  documentation = Documentation.PAIR_SCAN_DOC;

  constructor(private parameterService: ParametersService) { }

  ngOnInit() {
    this.setNullSize();
  }

  setNullSize() {
    this.parameterService.setPsNullSize(this.nullSize);
  }
  setMarkerPairConstraints() {
    this.parameterService.setPsMarkerPairConstraints(this.markerPairConstraint);
    // We initialize the max marker correlation and min individual per Genotype as the input fields have already a default value
    if (this.markerPairConstraint === this.markerPairConstraints[0]) {
      this.parameterService.setPsMaxMarkerCorrelation(this.maxMarkerCorrelation);
      this.parameterService.setPsMinIndPerGenotype(undefined);
    } else if (this.markerPairConstraint === this.markerPairConstraints[1]) {
      this.parameterService.setPsMaxMarkerCorrelation(undefined);
      this.parameterService.setPsMinIndPerGenotype(this.minIndPerGenotype);
    }
  }
  setMaxMarkerCorrelation() {
    this.parameterService.setPsMaxMarkerCorrelation(this.maxMarkerCorrelation);
  }
  setMinIndPerGenotype() {
    this.parameterService.setPsMinIndPerGenotype(this.minIndPerGenotype);
  }
}
