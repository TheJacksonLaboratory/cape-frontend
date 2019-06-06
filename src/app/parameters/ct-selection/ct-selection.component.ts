import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ParametersService, DataFilesService } from 'src/app/_services';
import { DescriptionComponent } from 'src/app/shared/description/description.component';
import { Documentation } from '../documentation';
import { Parameters } from '../../_models/parameters';

@Component({
  selector: 'app-ct-selection',
  templateUrl: './ct-selection.component.html',
  styleUrls: ['./ct-selection.component.scss']
})
export class CtSelectionComponent implements OnInit, OnDestroy {
  public static COVARIATE_TITLE = 'Covariate selection';
  public static TRAIT_TITLE = 'Trait selection';

  traitsToScan = ['Eigentraits', 'Raw Traits'];
  pValueCorrectionList = ['none', 'holm', 'hochberg', 'hommel', 'bonferroni', 'BH', 'BY', 'FDR'];

  // parameters
  normalize = true;
  meanCenter = true;
  numberOfIndividuals = 0;
  numberOfEigentraits = 2;
  traitSelected: string;
  pValueCorrection: string;

  parametersSubscription: Subscription;
  routeSubscription: Subscription;
  parameters: Parameters;

  dialogRef: MatDialogRef<DescriptionComponent> = null;

  constructor(private parametersService: ParametersService, private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
      if (this.parameters !== undefined) {
        this.normalize = this.parameters.normalize !== undefined ? this.parameters.normalize : this.normalize;
        this.meanCenter = this.parameters.mean_center !== undefined ? this.parameters.mean_center : this.meanCenter;
        this.traitSelected = this.parameters.traits_to_scan !== undefined ? this.parameters.traits_to_scan : this.traitSelected;
        this.pValueCorrection = this.parameters.p_value_correction !== undefined ? this.parameters.p_value_correction
                        : this.pValueCorrection;
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

  getCovariateTitle() {
    return CtSelectionComponent.COVARIATE_TITLE;
  }

  getTraitTitle() {
    return CtSelectionComponent.TRAIT_TITLE;
  }
  /**
   * Get the documentation for the Covariate tree selection
   */
  getCovariateDescription() {
    return Documentation.COVARIATE_SELECTION_DOC;
  }
  /**
   * Get the documentation for the trait tree selection
   */
  getTraitDescription() {
    return Documentation.TRAIT_SELECTION_DOC;
  }
  setNormalize() {
    this.parameters.normalize = !this.normalize;
  }
  setMeanCenter() {
    this.parameters.mean_center = !this.meanCenter;
  }
  /**
   * Set the type of trait to scan and reset the number of Eigentraits if raw traits is chosen
   */
  setTraitsToScan() {
    this.parameters.traits_to_scan = this.traitSelected;
    if (this.traitSelected === 'Eigentraits') {
      this.parameters.number_of_eigentraits = this.numberOfEigentraits;
    } else if (this.traitSelected === 'Raw Traits') {
      this.parameters.number_of_eigentraits = undefined;
    }
  }
  setNumberofET() {
    this.parameters.number_of_eigentraits = this.numberOfEigentraits;
  }
  setPValueCorrection() {
    this.parameters.p_value_correction = this.pValueCorrection;
  }

  /**
   * Open the documentation for this component of the Parameter UI
   */
  openDetailsDialog() {
    this.closeDialogIfOpen();
    this.dialogRef = this.dialog.open(DescriptionComponent, {
      data: { description: Documentation.TRAIT_DOC }
    });
  }

  private closeDialogIfOpen() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}
