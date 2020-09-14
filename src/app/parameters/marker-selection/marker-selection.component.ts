import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ParametersService } from 'src/app/_services';
import { Documentation } from '../documentation';
import { Parameters } from '../../_models/parameters';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-marker-selection',
  templateUrl: './marker-selection.component.html',
  styleUrls: ['./marker-selection.component.scss'],
})
export class MarkerSelectionComponent implements OnInit, OnDestroy {

  // parameters
  numberOfMarkersToTest = 100;
  snpsFileName = 'filteredSNPs.txt';

  peakDensity = 0.5;
  tolerance = 5;
  organism: string = "mouse";

  markerSelected: string = "top.effects";
  markerSelectionMethods = this.createMarkerSelections();
  peakDensityDescription = 'Peak density is the fraction of markers under a large effect peak you would like to select.';
  toleranceDescription = 'Tolerance is the number of markers away from the target number you will tolerate selecting.';
  organisms = ['human', 'mouse'];

  documentation = Documentation.MARKER_SELECTION_DOC;

  routeSubscription: Subscription;
  parametersSubscription: Subscription;
  parameters: Parameters;

  constructor(private parametersService: ParametersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
      if (this.parameters !== undefined) {
        this.numberOfMarkersToTest = this.parameters.ms_number_to_test !== undefined
                  ? this.parameters.ms_number_to_test : this.numberOfMarkersToTest;
        this.markerSelected = this.parameters.ms_method !== undefined ? this.parameters.ms_method : this.markerSelected;
        this.peakDensity = this.parameters.ms_peak_density !== undefined ? this.parameters.ms_peak_density : this.peakDensity;
        this.tolerance = this.parameters.ms_tolerance !== undefined ? this.parameters.ms_tolerance : this.tolerance;
        this.snpsFileName = this.parameters.ms_snp_filename !== undefined ? this.parameters.ms_snp_filename : this.snpsFileName;
        this.organism = this.parameters.ms_organism !== undefined ? this.parameters.ms_organism : this.organism;
        // set default
        this.parameters.ms_number_to_test = this.parameters.ms_number_to_test === undefined ? this.numberOfMarkersToTest
                                            : this.parameters.ms_number_to_test;
        this.parameters.ms_peak_density = this.parameters.ms_peak_density === undefined && this.markerSelected === 'top.effects'
                                            ? this.peakDensity : this.parameters.ms_peak_density;
        this.parameters.ms_tolerance = this.parameters.ms_tolerance === undefined && this.markerSelected === 'top.effects'
                                            ? this.tolerance : this.parameters.ms_tolerance;
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

  /**
   * Used to populate the Marker Selection input selection with its content and the corresponding tooltip data.
   */
  private createMarkerSelections() {
    const map = new Map();
    map.set('top.effects', 'This method selects the top effect size markers from under peaks of single-locus effect size curves.');
    map.set('uniform', 'This method selects the specified number of markers to be uniformly spaced across the genome.');
    map.set('by.gene', 'This method selects SNPs that are near genes. It requires an ordered list of genes, for example ' +
            'from NetWAS output.');
    map.set('from.list', 'Select the marker selections using a file.');
    return map;
  }

  getMarkerSelections() {
    return Array.from(this.markerSelectionMethods.keys());
  }

  getMarkerSelectionDescription(selected: string) {
    return this.markerSelectionMethods.get(selected);
  }

  setNumberOfMarkersToTest() {
    this.parameters.ms_number_to_test = this.numberOfMarkersToTest;
  }
  /**
   * Set the marker selection method. Setting it qlso requires to set up the other parameters
   * in order to reset them given what marker selection method has been chosen.
   */
  setMarkerSelectionMethod() {
    this.parameters.ms_method = this.markerSelected;
    this.parameters.ms_organism = this.organism;

    // We initialize if Top effect or From list is chosen as the UI input fields already have some default data
    if (this.markerSelected === 'top.effects') {
      this.parameters.ms_peak_density = this.peakDensity;
      this.parameters.ms_tolerance = this.tolerance;
      this.parameters.ms_snp_filename = undefined;
    } else if (this.markerSelected === 'from.list') {
      this.parameters.ms_snp_filename = this.snpsFileName;
      this.parameters.ms_peak_density = undefined;
      this.parameters.ms_tolerance = undefined;
    } else if ((this.markerSelected === 'by.gene') || (this.markerSelected === 'uniform')) {
      this.parameters.ms_peak_density = undefined;
      this.parameters.ms_tolerance = undefined;
      this.parameters.ms_snp_filename = undefined;
    }
  }
  setPeakDensity() {
    this.parameters.ms_peak_density = this.peakDensity;
  }
  setTolerance() {
    this.parameters.ms_tolerance = this.tolerance;
  }
  setOrganism() {
    this.parameters.ms_organism = this.organism;
  }
  setSNPFileName() {
    this.parameters.ms_snp_filename = this.snpsFileName;
  }
}
