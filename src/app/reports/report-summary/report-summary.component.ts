import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Report } from 'src/app/_models';
import { Router } from '@angular/router';
import { AlertService, AuthenticationService, ReportsService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.css']
})
export class ReportSummaryComponent implements OnInit {
  @Output() refreshEvent = new EventEmitter<string>();
  
  @Input()
  report: Report;
  reportImage: string;

  error = '';
  loading = false;
  
  constructor(private auth: AuthenticationService, private router: Router, private reportService: ReportsService, 
    private alertService: AlertService, private dialog: MatDialog) { 
  }
  ngOnInit(): void {
    this.reportImage = environment.FILE_URL + this.report.paths[0] + ".jpg";
  }

  openReport(element: Report) {
    this.router.navigate(['report-detail'], { queryParams: { 'id': element.id } });
  }

  deleteReport(element: Report) {
    const msgData = { 'title': 'Delete Report' };
    msgData['description'] = 'Delete the report named "' + element.title + '" ?';
    const userId = this.auth.getUserId();
    
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.reportService.deleteReport(element.id, userId).subscribe(data => {
          msgData['description'] = data['message'];
          console.log(data['message']);
          this.refreshEvent.next('report');
        }, error => {
          this.error = error;
          this.alertService.error(error);
          this.loading = false;
          msgData['title'] = 'Error';
          msgData['description'] = error;
          this.openResultDialog(msgData);
        });
      }
    });
  }

  private openResultDialog(data: any) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      // refresh datasource
      this.refreshEvent.next('report');
    });
  }

}
