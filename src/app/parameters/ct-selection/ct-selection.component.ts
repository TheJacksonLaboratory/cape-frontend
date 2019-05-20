import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef, MatDialog } from '@angular/material';

import { ParametersService } from 'src/app/_services';
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

  parametersSubscription: Subscription;
  parameters: Parameters;
  normalize = true;
  meanCenter = true;
  numberOfIndividuals = 0;
  numberOfEigentraits = 2;
  traitSelected: string;
  pValueCorrection: string;
  dialogRef: MatDialogRef<DescriptionComponent> = null;

  constructor(private parametersService: ParametersService, public dialog: MatDialog) {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
    });

  }

  ngOnInit() {
    // set default values
    this.parameters.normalize = this.normalize;
    this.parameters.meanCenter = this.meanCenter;
    this.parameters.traitsToScan = this.traitSelected;
    this.parameters.pValueCorrection = this.pValueCorrection;
  }
  ngOnDestroy(): void {
    this.parametersSubscription.unsubscribe();
  }

  getCovariateTitle() {
    return CtSelectionComponent.COVARIATE_TITLE;
  }

  getTraitTitle() {
    return CtSelectionComponent.TRAIT_TITLE;
  }
  getCovariateDescription() {
    return Documentation.COVARIATE_SELECTION_DOC;
  }
  getTraitDescription() {
    return Documentation.TRAIT_SELECTION_DOC;
  }
  setNormalize() {
    this.parameters.normalize = !this.normalize;
  }
  setMeanCenter() {
    this.parameters.meanCenter = !this.meanCenter;
  }
  setTraitsToScan() {
    this.parameters.traitsToScan = this.traitSelected;
    if (this.traitSelected === 'Eigentraits') {
      this.parameters.numOfEignenTraits = this.numberOfEigentraits;
    } else if (this.traitSelected === 'Raw Traits') {
      this.parameters.numOfEignenTraits = undefined;
    }
  }
  setNumberofET() {
    this.parameters.numOfEignenTraits = this.numberOfEigentraits;
  }
  setPValueCorrection() {
    this.parameters.pValueCorrection = this.pValueCorrection;
  }

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
