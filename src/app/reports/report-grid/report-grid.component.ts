import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportsService } from '../../_services/reports.service';
import { Report } from 'src/app/_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-grid',
  templateUrl: './report-grid.component.html',
  styleUrls: ['./report-grid.component.css']
})
export class ReportGridComponent implements OnInit {


  reports: Report[];
  private reportSub: Subscription;

  constructor(private reportService: ReportsService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.reportSub = this.reportService.getReports().subscribe(resp => {
      this.reports = resp;
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
    console.log('grid loaded');
  }

  ngOnDestroy() {
    this.reportSub.unsubscribe();
  }

  refresh() {
    this.reportService.getReports().subscribe(resp => {
      this.reports = resp;
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
    this.changeDetectorRefs.detectChanges();
  }
}
