import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ParametersService } from 'src/app/_services';
import { Documentation } from '../documentation';

@Component({
  selector: 'app-marker-selection',
  templateUrl: './marker-selection.component.html',
  styleUrls: ['./marker-selection.component.scss'],
})
export class MarkerSelectionComponent implements OnInit {

  numberOfMarkersToTest = 1500;
  snpsFileName = 'filteredSNPs.txt';
  markerSelected: any;
  markerSelectionMethod: string;
  peakDensity = 0.5;
  tolerance = 10;
  markerSelectionMethods = this.createMarkerSelections();
  peakDensityDescription = 'Peak density is the fraction of markers under a large effect peak you would like to select.';
  toleranceDescription = 'Tolerance is the number of markers away from the target number you will tolerate selecting.';
  organism: string;
  organisms = ['human', 'mouse'];

  documentation = Documentation.MARKER_SELECTION_DOC;

  constructor(private parameterService: ParametersService) {}

  ngOnInit() {
    this.parameterService.setMsNumberToTest(this.numberOfMarkersToTest);

  }

  createMarkerSelections() {
    const map = new Map();
    map.set('Top Effects', 'This method selects the top effect size markers from under peaks of single-locus effect size curves.');
    map.set('Uniform', 'This method selects the specified number of markers to be uniformly spaced across the genome.');
    map.set('By Gene', 'This method selects SNPs that are near genes. It requires an ordered list of genes, for example ' +
            'from NetWAS output.');
    map.set('From List', 'Select the marker selections using a file.');
    return map;
  }

  getMarkerSelections() {
    return Array.from(this.markerSelectionMethods.keys());
  }

  getMarkerSelectionDescription(selected: any) {
    return this.markerSelectionMethods.get(selected);
  }

  setNumberOfMarkersToTest() {
    this.parameterService.setMsNumberToTest(this.numberOfMarkersToTest);
  }
  setMarkerSelectionMethod() {
    this.parameterService.setMsMethod(this.markerSelected);
    // We initialize if Top effect or From list is chosen as the UI input fields already have some default data
    if (this.markerSelected === 'Top Effects') {
      this.parameterService.setMsPeakDensity(this.peakDensity);
      this.parameterService.setMsTolerance(this.tolerance);
      this.parameterService.setMsSnpFileName(undefined);
      this.parameterService.setMsOrganism(undefined);
    } else if (this.markerSelected === 'From List') {
      this.parameterService.setMsSnpFileName(this.snpsFileName);
      this.parameterService.setMsPeakDensity(undefined);
      this.parameterService.setMsTolerance(undefined);
      this.parameterService.setMsOrganism(undefined);
    } else if (this.markerSelected === 'By Gene') {
      this.parameterService.setMsOrganism(this.organism);
      this.parameterService.setMsPeakDensity(undefined);
      this.parameterService.setMsTolerance(undefined);
      this.parameterService.setMsSnpFileName(undefined);
    } else if (this.markerSelected === 'Uniform') {
      this.parameterService.setMsOrganism(undefined);
      this.parameterService.setMsPeakDensity(undefined);
      this.parameterService.setMsTolerance(undefined);
      this.parameterService.setMsSnpFileName(undefined);
    }
  }
  setPeakDensity() {
    this.parameterService.setMsPeakDensity(this.peakDensity);
  }
  setTolerance() {
    this.parameterService.setMsTolerance(this.tolerance);
  }
  setOrganism() {
    this.parameterService.setMsOrganism(this.organism);
  }
  setSNPFileName() {
    this.parameterService.setMsSnpFileName(this.snpsFileName);
  }
}
