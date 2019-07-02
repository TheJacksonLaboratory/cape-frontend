import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../_services/reports.service';
import { Report } from 'src/app/_models';

@Component({
  selector: 'app-report-grid',
  templateUrl: './report-grid.component.html',
  styleUrls: ['./report-grid.component.css']
})
export class ReportGridComponent implements OnInit {

  reports: Report[] = [];

  constructor(private reportService: ReportsService) { }

  ngOnInit() {
    this.reports = this.reportService.getAll();
    console.log('grid loaded');
  }

}
