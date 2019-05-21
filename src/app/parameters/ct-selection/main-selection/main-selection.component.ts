import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ParametersService } from 'src/app/_services';
import { ParametersData } from '../../parameters-data';
import { Parameters } from '../../../_models/parameters';


@Component({
  selector: 'app-main-selection',
  templateUrl: './main-selection.component.html',
  styleUrls: ['./main-selection.component.scss']
})
export class MainSelectionComponent implements OnInit, OnDestroy {
  files = ['AD_5xFAD.RDATA', 'AD_All.RDATA', 'AD_NTG.RDATA', 'AlportDO_CAPE.RDATA', 'CheslerDO.pheno.RDATA',
  'DO.pheno.genlitcov.RDATA', 'DO850.RDATA', 'obesity.cross.RDATA', 'SSc.RDATA'];
  fileIdx: number;
  plotTypes = ['Histogram', 'By Individual', 'Correlation', 'Heatmap', 'QNorm', 'Eigentraits'];
  fileSelected: string;
  selections: string[];

  titleFormControl = new FormControl('', [
    Validators.required
  ]);

  parametersSubscription: Subscription;
  parameters: Parameters;

  constructor(private parametersService: ParametersService) {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
    });
  }

  setFileIdxSelected(selected) {
    this.fileIdx = this.files.findIndex(item => item === selected);
    this.parametersService.setParameterFileIdxSelected(this.fileIdx);
    this.selections = ParametersData.fileSelections[this.fileIdx];
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.parametersSubscription.unsubscribe();
  }

  setTitle() {
    this.parameters.title = this.titleFormControl.value;
  }

}
