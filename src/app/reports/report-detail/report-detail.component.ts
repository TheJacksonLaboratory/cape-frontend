import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/_models';
import { Subscription } from 'rxjs';
import { ReportsService } from 'src/app/_services';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {

  @Input()
  report: Report = new Report();
  reportImages: string[] = [];
  sanitizedResultPageUrl: SafeResourceUrl;
  resultFolderUrl: string;
  resultPageUrl: string;
  imagesLeftColumn: string[] = [];
  imagesRightColumn: string[] = [];
  routeSubscription: Subscription;
  description: string;

  constructor(private reportService: ReportsService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
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
        this.resultFolderUrl = environment.FILE_URL + resp.result_folder;
        this.resultPageUrl = environment.FILE_URL + resp.result_page;
        this.sanitizedResultPageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.resultPageUrl + "?dummyVar=" + (new Date()).getTime());
        this.description = 'This page is an HTML rendered at the end of the analysis. In order to download the result plots, click on the following link:';
      }, err => {
        // TODO: display our server error dialog?
        console.log(err);
      });

    });
  }

}
