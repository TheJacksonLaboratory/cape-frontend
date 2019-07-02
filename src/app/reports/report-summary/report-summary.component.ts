import { Component, Input } from '@angular/core';
import { Report } from 'src/app/_models';

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.css']
})
export class ReportSummaryComponent {

  @Input()
  report: Report;

  constructor() { }

}
