import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-locus-scan',
  templateUrl: './single-locus-scan.component.html',
  styleUrls: ['./single-locus-scan.component.scss']
})
export class SingleLocusScanComponent implements OnInit {

  useKinship = false;
  kinshipType: string;
  kinshipTypes = [ 'Overall', 'LTCO' ];

  constructor() { }

  ngOnInit() {
  }

}
