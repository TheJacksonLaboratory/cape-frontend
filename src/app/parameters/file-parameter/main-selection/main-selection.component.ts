import { Component, OnInit, HostListener } from '@angular/core';
import { ParametersService } from 'src/app/_services';
import { FileParameterData } from '../file-parameter-data';


@Component({
  selector: 'app-main-selection',
  templateUrl: './main-selection.component.html',
  styleUrls: ['./main-selection.component.scss']
})
export class MainSelectionComponent implements OnInit {
  files = ['AD_5xFAD.RDATA', 'AD_All.RDATA', 'AD_NTG.RDATA', 'AlportDO_CAPE.RDATA', 'CheslerDO.pheno.RDATA',
  'DO.pheno.genlitcov.RDATA', 'DO850.RDATA', 'obesity.cross.RDATA', 'SSc.RDATA'];
  fileIdx: number;
  plotTypes = ['Histogram', 'By Individual', 'Correlation', 'Heatmap', 'QNorm', 'Eigentraits'];
  fileSelected: string;
  selections: string[];

  constructor(private parametersService: ParametersService) {}

  setFileIdxSelected(selected) {
    this.fileIdx = this.files.findIndex(item => item === selected);
    this.parametersService.setParameterFileIdxSelected(this.fileIdx);
    this.selections = FileParameterData.fileSelections[this.fileIdx];
  }

  ngOnInit() {}


}
