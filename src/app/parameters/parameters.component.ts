import { Component, OnInit, ViewChild, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatAccordion, MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { CanActivate } from '@angular/router';

import { ParametersService, AuthenticationService } from '../_services';
import { DescriptionComponent } from '../shared/description/description.component';
import { MarkerSelectionComponent } from './marker-selection/marker-selection.component';
import { PairScanComponent } from './pair-scan/pair-scan.component';
import { SingleLocusScanComponent } from './single-locus-scan/single-locus-scan.component';
import { Parameters } from '../_models/parameters';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ParametersComponent implements OnInit, OnDestroy, AfterViewInit, CanActivate {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayMode = 'default';
  multi = true;

  parametersSubscription: Subscription;
  // parameters
  parameters: Parameters;

  // documentation
  @ViewChild(SingleLocusScanComponent) singleScanChildDoc: SingleLocusScanComponent;
  @ViewChild(MarkerSelectionComponent) markerSelectionChildDoc: MarkerSelectionComponent;
  @ViewChild(PairScanComponent) pairScanChildDoc: PairScanComponent;

  singleLocusScanDocumentation: string;
  markerSelectionDocumentation: string;
  pairScanDocumentation: string;
  dialogRef: MatDialogRef<DescriptionComponent> = null;

  constructor(private parametersService: ParametersService, private authService: AuthenticationService, private dialog: MatDialog) {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
    });

  }

  ngOnInit() {
    this.parameters = new Parameters();
    this.parametersService.setParameters(this.parameters);
  }

  ngAfterViewInit(): void {
    this.singleLocusScanDocumentation = this.singleScanChildDoc ? this.singleScanChildDoc.documentation : '';
    this.markerSelectionDocumentation = this.markerSelectionChildDoc ? this.markerSelectionChildDoc.documentation : '';
    this.pairScanDocumentation = this.pairScanChildDoc ? this.pairScanChildDoc.documentation : '';
  }

  ngOnDestroy(): void {
    this.parametersSubscription.unsubscribe();
  }

  canActivate() {
    return this.authService.isAuthenticated();
  }

  private openDetailsDialog(documentation: string) {
    this.closeDialogIfOpen();
    this.dialogRef = this.dialog.open(DescriptionComponent, {
      data: { description: documentation }
    });
  }

  private closeDialogIfOpen() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  openSingleLocusDialog() {
    this.openDetailsDialog(this.singleLocusScanDocumentation);
  }
  openMarkerSelectionDialog() {
    this.openDetailsDialog(this.markerSelectionDocumentation);
  }
  openPairScanDialog() {
    this.openDetailsDialog(this.pairScanDocumentation);
  }

  /*
   * Creates a Yaml file with all the parameters
   */
  createYaml(): string {
    const first_comment = '# CAPE parameters YAML file\n' +
      '#================================================\n' +
      '# General Parameters \n' +
      '#================================================\n';
    let traits = this.parameters.traitSelection.size > 0 ? 'traits:\n' : '';
    this.parameters.traitSelection.forEach(trait => {
      traits = traits + (' - ' + trait + '\n');
    });
    let covariates = this.parameters.covariateSelection.size > 0 ? 'covariates:\n' : '';
    this.parameters.covariateSelection.forEach(covariate => {
      covariates = covariates + (' - ' + covariate + '\n');
    });
    const scanWhat = this.parameters.traitsToScan !== undefined ? 'scan_what:\n - ' + this.parameters.traitsToScan + '\n' : '';
    const traitsNormalized = this.parameters.normalize !== undefined ? 'traits_normalized:\n - ' + this.parameters.normalize + '\n' : '';
    const traitsScaled = this.parameters.meanCenter !== undefined ? 'traits_scaled:\n - ' + this.parameters.meanCenter + '\n' : '';
    const pvalCorrection = this.parameters.pValueCorrection !== undefined ? 'pval_correction:\n - ' + this.parameters.pValueCorrection + '\n' : '';
    let eigWhich = this.parameters.numOfEignenTraits !== undefined ? 'eig_which:\n' : '';
    for (let i = 1; i <= this.parameters.numOfEignenTraits; i++) {
      eigWhich = eigWhich + ' - ' + i + '\n';
    }

    const singleScanComment = '\n#================================================\n' +
      '# Single Scan Parameters \n' +
      '#================================================\n';
    const refAllele = this.parameters.slsReferenceAllele !== undefined ? 'ref_allele:\n - ' + this.parameters.slsReferenceAllele + '\n' : '';
    const singleScanPerm = this.parameters.slsNumberOfPermutations !== undefined ? 'singlescan_perm:\n - ' + this.parameters.slsNumberOfPermutations + '\n' : '';
    const useKinship = this.parameters.slsUseKinship !== undefined ? 'use_kinship:\n - ' + this.parameters.slsUseKinship + '\n' : '';
    const kintshipType = this.parameters.slsKinshipType !== undefined ? 'kingship_type:\n - ' + this.parameters.slsKinshipType + '\n' : '';

    const markerSelectionComment = '\n#================================================\n' +
      '# Marker Selection Parameters\n' +
      '#================================================\n';
    const markerSelectionMethod = this.parameters.msMethod !== undefined ? 'marker_selection_method:\n - ' + this.parameters.msMethod + '\n' : '';
    const windowSize = this.parameters.msNumberToTest !== undefined ? 'num_alleles_in_pairscan:\n - ' + this.parameters.msNumberToTest + '\n' : '';
    const peakDensity = this.parameters.msPeakDensity !== undefined ? 'peak_density:\n - ' + this.parameters.msPeakDensity + '\n' : '';
    const tolerance = this.parameters.msTolerance !== undefined ? 'tolerance:\n - ' + this.parameters.msTolerance + '\n' : '';
    const snpFile = this.parameters.msSnpFileName !== undefined ? 'SNPfile:\n - ' + this.parameters.msSnpFileName + '\n' : '';
    const organism = this.parameters.msOrganism !== undefined ? 'organism:\n - ' + this.parameters.msOrganism + '\n' : '';

    const pairScanComment = '\n#================================================\n' +
      '# Pairscan Parameters\n' +
      '#================================================\n';
    const pairScanNullSize = this.parameters.psNullSize !== undefined ? 'pairscan_null_size:\n - ' + this.parameters.psNullSize + '\n' : '';
    const maxPairCor = this.parameters.psMaxMarkerCorrelation !== undefined ? 'max_pair_cor:\n - ' + this.parameters.psMaxMarkerCorrelation + '\n' : '';
    const minPerGeno = this.parameters.psMinIndPerGenotype !== undefined ? 'min_per_geno:\n -  ' + this.parameters.psMinIndPerGenotype + '\n' : '';

    // build the yaml string from the strings above
    const data = first_comment + traits + covariates + scanWhat + traitsNormalized + traitsScaled + pvalCorrection + eigWhich
      + singleScanComment + refAllele + singleScanPerm + useKinship + kintshipType
      + markerSelectionComment + markerSelectionMethod + windowSize + peakDensity + tolerance + snpFile + organism
      + pairScanComment + pairScanNullSize + maxPairCor + minPerGeno;

    return data;
  }

  saveFile(data: string) {
    const filename = 'cape.parameters.yml';
    const blob = new Blob([data], { type: 'text/yaml' });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }

  saveYaml() {
    const yamlString = this.createYaml();
    this.saveFile(yamlString);
  }

  /**
   * Creates a new data file
   */
  createDataFile() {

  }

}
