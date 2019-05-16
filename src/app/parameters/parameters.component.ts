import { Component, OnInit, ViewChild, OnDestroy, Output } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { Subscription } from 'rxjs';
import { ParametersService } from '../_services';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})

export class ParametersComponent implements OnInit, OnDestroy {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayMode = 'default';
  multi = true;

  fileNameSubscription: Subscription;
  selectPlotSubscription: Subscription;
  colorBySubscription: Subscription;
  traitSelectionSubscription: Subscription;
  covariateSelectionSubscription: Subscription;
  normalizeSubscription: Subscription;
  meanCenterSubscription: Subscription;
  traitsToScanSubscription: Subscription;
  numberOfEigentraitsSubscription: Subscription;
  pValueCorrectionSubscription: Subscription;
  referenceAlleleSubscription: Subscription;
  numberOfPermutationsSubscription: Subscription;
  useKinshipSubscription: Subscription;
  kinshipTypeSubscription: Subscription;
  msNumberToTestSubscription: Subscription;
  msMethodSubscription: Subscription;
  msPeakDensitySubscription: Subscription;
  msToleranceSubscription: Subscription;
  msOrganismSubscription: Subscription;
  msSnpFileNameSubscription: Subscription;
  psNullSizeSubscription: Subscription;
  psMarkerPairConstraintsSubscription: Subscription;
  psMaxMarkerCorrelationSubscription: Subscription;
  psMinIndPerGenotypeSubscription: Subscription;

  fileName: string;
  selectPlot: string;
  colorBy: string;
  traitTreeSelection: Set<string>;
  covariateTreeSelection: Set<string>;
  normalize: boolean;
  meanCenter: boolean;
  traitsToScan: string;
  numberOfEigentraits: number;
  pValueCorrection: string;
  referenceAllele: string;
  numberOfPermutations: number;
  useKinship: boolean;
  kinshipType: string;
  msNumberToTest: number;
  msMethod: string;
  msPeakDensity: number;
  msTolerance: number;
  msOrganism: string;
  msSnpFileName: string;
  psNullSize: number;
  psMarkerPairConstraints: string;
  psMaxMarkerCorrelation: number;
  psMinIndPerGenotype: number;

  constructor(private parameterService: ParametersService) {
    this.fileNameSubscription = this.parameterService.getFileName().subscribe(fileName => {
      this.fileName = fileName;
    });
    this.selectPlotSubscription = this.parameterService.getSelectPlot().subscribe(selectPlot => {
      this.selectPlot = selectPlot;
    });
    this.colorBySubscription = this.parameterService.getColorBy().subscribe(colorBy => {
      this.colorBy = colorBy;
    });
    this.traitSelectionSubscription = this.parameterService.getTraitSelection().subscribe(traitTreeSelection => {
      this.traitTreeSelection = traitTreeSelection;
    });
    this.covariateSelectionSubscription = this.parameterService.getCovariateSelection().subscribe(covariateTreeSelection => {
      this.covariateTreeSelection = covariateTreeSelection;
    });
    this.normalizeSubscription = this.parameterService.getNormalize().subscribe(normalize => {
      this.normalize = normalize;
    });
    this.meanCenterSubscription = this.parameterService.getMeanCenter().subscribe(meanCenter => {
      this.meanCenter = meanCenter;
    });
    this.traitsToScanSubscription = this.parameterService.getTraitsToScan().subscribe(traitsToScan => {
      this.traitsToScan = traitsToScan;
    });
    this.numberOfEigentraitsSubscription = this.parameterService.getNumOfEigentraits().subscribe(numberOfEigentraits => {
      this.numberOfEigentraits = numberOfEigentraits;
    });
    this.pValueCorrectionSubscription = this.parameterService.getPValueCorrection().subscribe(pValueCorrection => {
      this.pValueCorrection = pValueCorrection;
    });
    this.referenceAlleleSubscription = this.parameterService.getReferenceAllele().subscribe(referenceAllele => {
      this.referenceAllele = referenceAllele;
    });
    this.numberOfPermutationsSubscription = this.parameterService.getNumberOfPermutations().subscribe(numberOfPermutations => {
      this.numberOfPermutations = numberOfPermutations;
    });
    this.useKinshipSubscription = this.parameterService.getUseKinship().subscribe(useKinship => {
      this.useKinship = useKinship;
    });
    this.kinshipTypeSubscription = this.parameterService.getKinshipType().subscribe(kinshipType => {
      this.kinshipType = kinshipType;
    });
    this.msNumberToTestSubscription = this.parameterService.getMsNumberToTest().subscribe(msNumberToTest => {
      this.msNumberToTest = msNumberToTest;
    });
    this.msMethodSubscription = this.parameterService.getMsMethod().subscribe(msMethod => {
      this.msMethod = msMethod;
    });
    this.msPeakDensitySubscription = this.parameterService.getMsPeakDensity().subscribe(msPeakDensity => {
      this.msPeakDensity = msPeakDensity;
    });
    this.msToleranceSubscription = this.parameterService.getMsTolerance().subscribe(msTolerance => {
      this.msTolerance = msTolerance;
    });
    this.msOrganismSubscription = this.parameterService.getMsOrganism().subscribe(msOrganism => {
      this.msOrganism = msOrganism;
    });
    this.msSnpFileNameSubscription = this.parameterService.getMsSnpFileName().subscribe(msSnpFileName => {
      this.msSnpFileName = msSnpFileName;
    });
    this.psNullSizeSubscription = this.parameterService.getPsNullSize().subscribe(psNullSize => {
      this.psNullSize = psNullSize;
    });
    this.psMarkerPairConstraintsSubscription = this.parameterService.getPsMarkerPairConstraints().subscribe(psMarkerPairConstraints => {
      this.psMarkerPairConstraints = psMarkerPairConstraints;
    });
    this.psMaxMarkerCorrelationSubscription = this.parameterService.getPsMaxMarkerCorrelation()
      .subscribe(psMaxMarkerCorrelation => {
        this.psMaxMarkerCorrelation = psMaxMarkerCorrelation;
      });
    this.psMinIndPerGenotypeSubscription = this.parameterService.getPsMinIndPerGenotype()
      .subscribe(psMinIndPerGenotype => {
        this.psMinIndPerGenotype = psMinIndPerGenotype;
      });

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.fileNameSubscription.unsubscribe();
    this.selectPlotSubscription.unsubscribe();
    this.colorBySubscription.unsubscribe();
    this.covariateSelectionSubscription.unsubscribe();
    this.traitSelectionSubscription.unsubscribe();
    this.normalizeSubscription.unsubscribe();
    this.meanCenterSubscription.unsubscribe();
    this.traitsToScanSubscription.unsubscribe();
    this.numberOfEigentraitsSubscription.unsubscribe();
    this.pValueCorrectionSubscription.unsubscribe();
    this.referenceAlleleSubscription.unsubscribe();
    this.numberOfPermutationsSubscription.unsubscribe();
    this.useKinshipSubscription.unsubscribe();
    this.kinshipTypeSubscription.unsubscribe();
    this.msNumberToTestSubscription.unsubscribe();
    this.msMethodSubscription.unsubscribe();
    this.msPeakDensitySubscription.unsubscribe();
    this.msToleranceSubscription.unsubscribe();
    this.msOrganismSubscription.unsubscribe();
    this.msSnpFileNameSubscription.unsubscribe();
    this.psNullSizeSubscription.unsubscribe();
    this.psMarkerPairConstraintsSubscription.unsubscribe();
    this.psMaxMarkerCorrelationSubscription.unsubscribe();
    this.psMinIndPerGenotypeSubscription.unsubscribe();

  }

  /*
   * Creates a Yaml file with all the parameters
   */
  saveYaml(): string {
    const filename = 'cape.parameters.yml';
    const first_comment = '# CAPE parameters YAML file\n' +
      '#================================================\n' +
      '# General Parameters \n' +
      '#================================================\n';
    let traits = this.traitTreeSelection.size > 0 ? 'traits:\n' : '';
    this.traitTreeSelection.forEach(trait => {
      traits = traits + (' - ' + trait + '\n');
    });
    let covariates = this.covariateTreeSelection.size > 0 ? 'covariates:\n' : '';
    this.covariateTreeSelection.forEach(covariate => {
      covariates = covariates + (' - ' + covariate + '\n');
    });
    const scanWhat = this.traitsToScan !== undefined ? 'scan_what:\n - ' + this.traitsToScan + '\n' : '';
    const traitsNormalized = this.normalize !== undefined ? 'traits_normalized:\n - ' + this.normalize + '\n' : '';
    const traitsScaled = this.meanCenter !== undefined ? 'traits_scaled:\n - ' + this.meanCenter + '\n' : '';
    const pvalCorrection = this.pValueCorrection !== undefined ? 'pval_correction:\n - ' + this.pValueCorrection + '\n' : '';
    let eigWhich = this.numberOfEigentraits !== undefined ? 'eig_which:\n' : '';
    for (let i = 1; i <= this.numberOfEigentraits; i++) {
      eigWhich = eigWhich + ' - ' + i + '\n';
    }

    const singleScanComment = '\n#================================================\n' +
      '# Single Scan Parameters \n' +
      '#================================================\n';
    const refAllele = this.referenceAllele !== undefined ? 'ref_allele:\n - ' + this.referenceAllele + '\n' : '';
    const singleScanPerm = this.numberOfPermutations !== undefined ? 'singlescan_perm:\n - ' + this.numberOfPermutations + '\n' : '';
    const useKinship = this.useKinship !== undefined ? 'use_kinship:\n - ' + this.useKinship + '\n' : '';
    const kintshipType = this.kinshipType !== undefined ? 'kingship_type:\n - ' + this.kinshipType + '\n' : '';

    const markerSelectionComment = '\n#================================================\n' +
      '# Marker Selection Parameters\n' +
      '#================================================\n';
    const markerSelectionMethod = this.msMethod !== undefined ? 'marker_selection_method:\n - ' + this.msMethod + '\n' : '';
    const windowSize = this.msNumberToTest !== undefined ? 'num_alleles_in_pairscan:\n - ' + this.msNumberToTest + '\n' : '';
    const peakDensity = this.msPeakDensity !== undefined ? 'peak_density:\n - ' + this.msPeakDensity + '\n' : '';
    const tolerance = this.msTolerance !== undefined ? 'tolerance:\n - ' + this.msTolerance + '\n' : '';
    const snpFile = this.msSnpFileName !== undefined ? 'SNPfile:\n - ' + this.msSnpFileName + '\n' : '';
    const organism = this.msOrganism !== undefined ? 'organism:\n - ' + this.msOrganism + '\n' : '';

    const pairScanComment = '\n#================================================\n' +
      '# Pairscan Parameters\n' +
      '#================================================\n';
    const pairScanNullSize = this.psNullSize !== undefined ? 'pairscan_null_size:\n - ' + this.psNullSize + '\n' : '';
    const maxPairCor = this.psMaxMarkerCorrelation !== undefined ? 'max_pair_cor:\n - ' + this.psMaxMarkerCorrelation + '\n' : '';
    const minPerGeno = this.psMinIndPerGenotype !== undefined ? 'min_per_geno:\n -  ' + this.psMinIndPerGenotype + '\n' : '';

    // build the yaml string from the strings above
    const data = first_comment + traits + covariates + scanWhat + traitsNormalized + traitsScaled + pvalCorrection + eigWhich
      + singleScanComment + refAllele + singleScanPerm + useKinship + kintshipType
      + markerSelectionComment + markerSelectionMethod + windowSize + peakDensity + tolerance + snpFile + organism
      + pairScanComment + pairScanNullSize + maxPairCor + minPerGeno;
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
    return data;
  }
}
