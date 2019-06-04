import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ParametersService, DataFilesService } from 'src/app/_services';
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
  selections: string[];

  fileSelected: string;
  plotType: string;
  colorBy: string;

  titleFormControl = new FormControl('', [
    Validators.required
  ]);

  parametersSubscription: Subscription;
  routeSubscription: Subscription;
  parameters: Parameters;

  constructor(private parametersService: ParametersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
      if (this.parameters !== undefined) {
        this.plotType = parameters.select_plot;
        this.titleFormControl.setValue(parameters.title);
        this.colorBy = parameters.color_by;
        this.setFileIdxSelected(parameters.filename);
      }
    });
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.parametersService.setParameters(Parameters.parse(params));
    });
  }

  ngOnDestroy() {
    this.parametersSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  setFileIdxSelected(selected) {
    this.fileIdx = this.files.findIndex(item => item === selected);
    this.parametersService.setParameterFileIdxSelected(this.fileIdx);
    this.fileSelected = selected;
    this.parameters.filename = this.fileSelected;
    this.selections = ParametersData.fileSelections[this.fileIdx];
  }

  setTitle() {
    this.parameters.title = this.titleFormControl.value;
  }

  setSelectPlot() {
    this.parameters.select_plot = this.plotType;
  }

  setColorBy() {
    this.parameters.color_by = this.colorBy;
  }

}
