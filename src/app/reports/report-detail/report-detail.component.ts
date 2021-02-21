import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/_models';
import { throwError, Subscription } from 'rxjs';
import { ReportsService } from 'src/app/_services';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {

  @Input()
  report: Report = new Report();
  reportImages: string[] = [];
  reportPageUrl: string;
  imagesLeftColumn: string[] = [];
  imagesRightColumn: string[] = [];
  routeSubscription: Subscription;

  constructor(private reportService: ReportsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      let reportId = params['id'];
      console.log('report id' + reportId);
      this.reportService.getReport(reportId).subscribe(resp => {
        console.log("paths: " + resp.paths);
        this.report = resp;
        resp.paths.forEach((value, index) => {
          this.reportImages[index] = environment.FILE_URL + value;
        });
        this.reportImages.forEach((value, index) => {
          if (index%2 ==0) 
            this.imagesLeftColumn[index] = value;
          else
            this.imagesRightColumn[index] = value;
        });
        this.reportPageUrl = environment.FILE_URL + resp.result_page
      }, err => {
        // TODO: display our server error dialog?
        console.log(err);
      });

    });
  }
}
