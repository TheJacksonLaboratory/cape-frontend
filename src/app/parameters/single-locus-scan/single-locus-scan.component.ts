import { Component, OnInit } from '@angular/core';
import { ParametersService } from 'src/app/_services';
import { Documentation } from '../documentation';

@Component({
  selector: 'app-single-locus-scan',
  templateUrl: './single-locus-scan.component.html',
  styleUrls: ['./single-locus-scan.component.scss']
})
export class SingleLocusScanComponent implements OnInit {

  referenceAllele = 'A';
  numberOfPermutations = 1;
  useKinship = false;
  kinshipType: string;
  kinshipTypes = [ 'Overall', 'LTCO' ];

  documentation = Documentation.SINGLE_LOCUS_SCAN_DOC;

  constructor(private parametersService: ParametersService) { }

  ngOnInit() {
    this.parametersService.setReferenceAllele(this.referenceAllele);
    this.parametersService.setNumberOfPermutations(this.numberOfPermutations);
    this.parametersService.setUseKinship(this.useKinship);
  }

  setReferenceAllele() {
    this.parametersService.setReferenceAllele(this.referenceAllele);
  }
  setNumberOfPermutations() {
    this.parametersService.setNumberOfPermutations(this.numberOfPermutations);
  }
  setUseKinship() {
    this.parametersService.setUseKinship(!this.useKinship);
    if (this.useKinship) {  // if the useKinship checkbox is unchecked we reset the kinshipType
      this.parametersService.setKinshipType(undefined);
    }
  }
  setKinshipType() {
    this.parametersService.setKinshipType(this.kinshipType);
  }
}
