import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/_models';
import { Router } from '@angular/router';
import { ReportsService } from 'src/app/_services';

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.css']
})
export class ReportSummaryComponent implements OnInit {

  @Input()
  report: Report;
  reportImage: string;

  constructor(private router: Router, private reportService: ReportsService) { 
  }
  ngOnInit(): void {
    this.reportImage = "http://localhost:8080" + this.report.paths[0] + ".jpg";

  }

  openReport(element: Report) {
    this.router.navigate(['report-detail'], { queryParams: { 'id': element.id } });
  }
}
