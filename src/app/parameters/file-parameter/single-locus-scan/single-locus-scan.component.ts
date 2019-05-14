import { Component, OnInit } from '@angular/core';
import { ParametersService } from 'src/app/_services';

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
  }
  setKinshipType() {
    this.parametersService.setKinshipType(this.kinshipType);
  }
}
