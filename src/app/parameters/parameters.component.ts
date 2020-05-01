import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ParametersService, AuthenticationService, AlertService } from '../_services';
import { DescriptionComponent } from '../shared/description/description.component';
import { MarkerSelectionComponent } from './marker-selection/marker-selection.component';
import { PairScanComponent } from './pair-scan/pair-scan.component';
import { SingleLocusScanComponent } from './single-locus-scan/single-locus-scan.component';
import { Parameters } from '../_models/parameters';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})

export class ParametersComponent implements OnInit, OnDestroy, AfterViewInit {
  displayMode = 'default';

  loading = false;
  returnUrl: string;
  error = '';
  // parameters file
  parametersSubscription: Subscription;
  routeSubscription: Subscription;
  parameters: Parameters;

  // documentation
  @ViewChild(SingleLocusScanComponent, {static: false}) singleScanChildDoc: SingleLocusScanComponent;
  @ViewChild(MarkerSelectionComponent, {static: false}) markerSelectionChildDoc: MarkerSelectionComponent;
  @ViewChild(PairScanComponent, {static: false}) pairScanChildDoc: PairScanComponent;
  singleLocusScanDocumentation: string;
  markerSelectionDocumentation: string;
  pairScanDocumentation: string;
  dialogRef: MatDialogRef<DescriptionComponent> = null;

  constructor(private parametersService: ParametersService, private authService: AuthenticationService,
    private alertService: AlertService, private route: ActivatedRoute, private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
    });

    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.parametersService.setParameters(Parameters.parse(params));
    });
  }

  ngAfterViewInit(): void {
    this.singleLocusScanDocumentation = this.singleScanChildDoc ? this.singleScanChildDoc.documentation : '';
    this.markerSelectionDocumentation = this.markerSelectionChildDoc ? this.markerSelectionChildDoc.documentation : '';
    this.pairScanDocumentation = this.pairScanChildDoc ? this.pairScanChildDoc.documentation : '';
  }

  ngOnDestroy(): void {
    this.parametersSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  /**
   * Description dialog
   * @param documentation
   */
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

  /**
   * Open documentation for Single Locus Scan component
   */
  openSingleLocusDialog() {
    this.openDetailsDialog(this.singleLocusScanDocumentation);
  }
  /**
   * Open documentation for Marker Selection component
   */
  openMarkerSelectionDialog() {
    this.openDetailsDialog(this.markerSelectionDocumentation);
  }
  /**
   * Open documentation for Pair Scan component
   */
  openPairScanDialog() {
    this.openDetailsDialog(this.pairScanDocumentation);
  }

  /*
   * Creates a Yaml file with all the parameters
   */
  private createYaml(): string {
    const first_comment = '# CAPE parameters YAML file\n' +
      '#================================================\n' +
      '# General Parameters \n' +
      '#================================================\n';
    let traits = this.parameters.trait_selection.length > 0 ? 'traits:\n' : '';
    this.parameters.trait_selection.forEach(trait => {
      traits = traits + (' - ' + trait + '\n');
    });
    let covariates = this.parameters.covariate_selection.length > 0 ? 'covariates:\n' : '';
    this.parameters.covariate_selection.forEach(covariate => {
      covariates = covariates + (' - ' + covariate + '\n');
    });
    const scanWhat = this.parameters.traits_to_scan !== undefined && this.parameters.traits_to_scan !== null
      ? 'scan_what:\n - ' + this.parameters.traits_to_scan + '\n' : '';
    const traitsNormalized = this.parameters.normalize !== undefined && this.parameters.normalize !== null
      ? 'traits_normalized:\n - ' + this.parameters.normalize + '\n' : '';
    const traitsScaled = this.parameters.mean_center !== undefined && this.parameters.mean_center !== null
      ? 'traits_scaled:\n - ' + this.parameters.mean_center + '\n' : '';
    const pvalCorrection = this.parameters.p_value_correction !== undefined && this.parameters.p_value_correction !== null
      ? 'pval_correction:\n - ' + this.parameters.p_value_correction + '\n' : '';
    const popType = this.parameters.pop_type !== undefined && this.parameters.pop_type !== null
      ? 'pop:\n - ' + this.parameters.pop_type + '\n' : '';
    let eigWhich = this.parameters.number_of_eigentraits !== undefined && this.parameters.number_of_eigentraits !== null
      ? 'eig_which:\n' : '';
    for (let i = 1; i <= this.parameters.number_of_eigentraits; i++) {
      eigWhich = eigWhich + ' - ' + i + '\n';
    }
    const saveResults = 'save_results:\n - true\n';
    const useSavedResults = 'use_saved_results:\n - false\n';

    const singleScanComment = '\n#================================================\n' +
      '# Single Scan Parameters \n' +
      '#================================================\n';
    const refAllele = this.parameters.sls_reference_allele !== undefined && this.parameters.sls_reference_allele !== null
      ? 'ref_allele:\n - ' + this.parameters.sls_reference_allele + '\n' : '';
    const singleScanPerm = this.parameters.sls_number_of_permutations !== undefined && this.parameters.sls_number_of_permutations !== null
      ? 'singlescan_perm:\n - ' + this.parameters.sls_number_of_permutations + '\n' : '';
    const useKinship = this.parameters.sls_use_kinship !== undefined && this.parameters.sls_use_kinship !== null
      ? 'use_kinship:\n - ' + this.parameters.sls_use_kinship + '\n' : '';
    const kinshipType = this.parameters.sls_kinship_type !== undefined && this.parameters.sls_kinship_type !== null
      ? 'kinship_type:\n - ' + this.parameters.sls_kinship_type + '\n' : '';

    const markerSelectionComment = '\n#================================================\n' +
      '# Marker Selection Parameters\n' +
      '#================================================\n';
    const markerSelectionMethod = this.parameters.ms_method !== undefined && this.parameters.ms_method !== null
      ? 'marker_selection_method:\n - ' + this.parameters.ms_method + '\n' : '';
    const windowSize = this.parameters.ms_number_to_test !== undefined && this.parameters.ms_number_to_test !== null
      ? 'num_alleles_in_pairscan:\n - ' + this.parameters.ms_number_to_test + '\n' : '';
    const peakDensity = this.parameters.ms_peak_density !== undefined && this.parameters.ms_peak_density !== null
      ? 'peak_density:\n - ' + this.parameters.ms_peak_density + '\n' : '';
    const tolerance = this.parameters.ms_tolerance !== undefined && this.parameters.ms_tolerance !== null
      ? 'tolerance:\n - ' + this.parameters.ms_tolerance + '\n' : '';
    const snpFile = this.parameters.ms_snp_filename !== undefined && this.parameters.ms_snp_filename !== null
      ? 'SNPfile:\n - ' + this.parameters.ms_snp_filename + '\n' : '';
    const organism = this.parameters.ms_organism !== undefined && this.parameters.ms_organism !== null
      ? 'organism:\n - ' + this.parameters.ms_organism + '\n' : '';

    const pairScanComment = '\n#================================================\n' +
      '# Pairscan Parameters\n' +
      '#================================================\n';
    const pairScanNullSize = this.parameters.ps_null_size !== undefined && this.parameters.ps_null_size !== null
      ? 'pairscan_null_size:\n - ' + this.parameters.ps_null_size + '\n' : '';
    const maxPairCor = this.parameters.ps_max_marker_correlation !== undefined && this.parameters.ps_max_marker_correlation !== null
      ? 'max_pair_cor:\n - ' + this.parameters.ps_max_marker_correlation + '\n' : '';
    const minPerGeno = this.parameters.ps_min_individual_per_genotype !== undefined && this.parameters.ps_min_individual_per_genotype !== null
      ? 'min_per_genotype:\n - ' + this.parameters.ps_min_individual_per_genotype + '\n' : '';

    // build the yaml string from the strings above
    const data = first_comment + traits + covariates + scanWhat + traitsNormalized + traitsScaled + pvalCorrection 
      + popType + saveResults + useSavedResults + eigWhich
      + singleScanComment + refAllele + singleScanPerm + useKinship + kinshipType
      + markerSelectionComment + markerSelectionMethod + windowSize + peakDensity + tolerance + snpFile + organism
      + pairScanComment + pairScanNullSize + maxPairCor + minPerGeno;

    return data;
  }

  /**
   * Creates/save a new parameters file by calling the corresponding back end API endpoint
   */
  saveParametersFile() {
    this.loading = true;
    // Add the full yaml file to the list of parameters
    this.parameters.yaml_file = this.createYaml();
    // open intermediary dialog
    this.openWarningDialog();
  }

  /**
   * Dialog used to display a confirmation to the user before applying the wanted action
   * @param data message to pass to dialog
   */
  private openWarningDialog() {
    const msgData = { 'title': 'Parameter Initialization' };
    msgData['description'] = 'Save the parameter file named "' + this.parameters.title + '" ?';
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        const resp = this.parametersService.saveParameterFile(this.parameters).subscribe(data => {
          msgData['description'] = data['message'];
          this.openResultDialog(msgData);
        }, error => {
          this.error = error;
          this.alertService.error(error);
          this.loading = false;
          msgData['title'] = 'Error';
          msgData['description'] = error;
          this.openResultDialog(msgData);
        });
      }
    });
  }

  private openResultDialog(data: any) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
