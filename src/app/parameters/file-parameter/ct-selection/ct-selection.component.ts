import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ct-selection',
  templateUrl: './ct-selection.component.html',
  styleUrls: ['./ct-selection.component.scss']
})
export class CtSelectionComponent implements OnInit {

  normalize = false;
  meanCenter = false;

  traitSelected: string;
  traitSelections = [ 'Eigentraits', 'Raw Traits' ];

  pValueCorrection: string;
  pValueCorrectionList = [ 'none', 'holm', 'hochberg',  'hommel', 'bonferroni', 'BH', 'BY', 'FDR' ];

  constructor() { }

  ngOnInit() {
  }

}
