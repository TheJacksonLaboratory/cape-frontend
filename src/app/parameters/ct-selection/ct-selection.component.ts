import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { ParametersService } from 'src/app/_services';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DescriptionComponent } from 'src/app/shared/description/description.component';
import { Documentation } from '../documentation';

@Component({
  selector: 'app-ct-selection',
  templateUrl: './ct-selection.component.html',
  styleUrls: ['./ct-selection.component.scss']
})
export class CtSelectionComponent implements OnInit {
  public static COVARIATE_TITLE = 'Covariate selection';
  public static TRAIT_TITLE = 'Trait selection';

  traitsToScan = ['Eigentraits', 'Raw Traits'];
  pValueCorrectionList = ['none', 'holm', 'hochberg', 'hommel', 'bonferroni', 'BH', 'BY', 'FDR'];

  normalize = true;
  meanCenter = true;
  numberOfIndividuals = 0;
  numberOfEigentraits = 2;
  traitSelected: string;
  pValueCorrection: string;
  dialogRef: MatDialogRef<DescriptionComponent> = null;

  constructor(private parametersService: ParametersService, public dialog: MatDialog) {
    // set default values
    this.parametersService.setNormalize(this.normalize);
    this.parametersService.setMeanCenter(this.meanCenter);
    this.parametersService.setTraitsToScan(this.traitSelected);
    this.parametersService.setPValueCorrection(this.pValueCorrection);
  }

  ngOnInit() {
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
    this.parametersService.setNormalize(!this.normalize);
  }
  setMeanCenter() {
    this.parametersService.setMeanCenter(!this.meanCenter);
  }
  setTraitsToScan() {
    this.parametersService.setTraitsToScan(this.traitSelected);
    if (this.traitSelected === 'Eigentraits') {
      this.parametersService.setNumOfEignentraits(this.numberOfEigentraits);
    } else if (this.traitSelected === 'Raw Traits') {
      this.parametersService.setNumOfEignentraits(undefined);
    }
  }
  setNumberofET() {
    this.parametersService.setNumOfEignentraits(this.numberOfEigentraits);
  }
  setPValueCorrection() {
    this.parametersService.setPValueCorrection(this.pValueCorrection);
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