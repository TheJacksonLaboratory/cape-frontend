import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-marker-selection',
  templateUrl: './marker-selection.component.html',
  styleUrls: ['./marker-selection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MarkerSelectionComponent implements OnInit {

  numberOfMarkersToTest = 1500;
  snpsFileName = 'filteredSNPs.txt';
  markerSelected: null;
  markerSelectionMethod: string;
  markerSelectionMethods = this.createMarkerSelections();
  peakDensityDescription = 'Peak density is the fraction of markers under a large effect peak you would like to select.';
  toleranceDescription = 'Tolerance is the number of markers away from the target number you will tolerate selecting.';
  organisms = ['human', 'mouse'];

  constructor() {}

  ngOnInit() {
  }

  createMarkerSelections() {
    const map = new Map();
    map.set('Top Effects', 'This method selects the top effect size markers from under peaks of single-locus effect size curves.');
    map.set('Uniform', 'This method selects the specified number of markers to be uniformly spaced across the genome.');
    map.set('By Gene', 'This method selects SNPs that are near genes. It requires an ordered list of genes, for example from NetWAS output.');
    map.set('From List', 'Select the marker selections using a file.');
    return map;
  }

  getMarkerSelections() {
    return Array.from(this.markerSelectionMethods.keys());
  }

  getMarkerSelectionDescription(selected: any) {
    return this.markerSelectionMethods.get(selected);
  }
}
