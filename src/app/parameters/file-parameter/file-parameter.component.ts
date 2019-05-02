import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';

@Component({
  selector: 'app-file-parameter',
  templateUrl: './file-parameter.component.html',
  styleUrls: ['./file-parameter.component.scss']
})

export class FileParameterComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayMode = 'default';
  multi = true;

  constructor() {}

  ngOnInit() {
  }

}
