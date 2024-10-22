import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, Observable, interval } from 'rxjs';

import { JobService, AlertService, ReportsService, AuthenticationService } from '../_services';
import { Job } from '../_models/job';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { startWith, switchMap } from 'rxjs/operators';
import { Report } from '../_models';
import { ProgressDialogComponent } from '../shared/progress-dialog/progress-dialog.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {
  columnsToDisplay = ['id', 'date_created', 'owner', 'parameter_setup', 'status', 'actions'];

  dataSource: MatTableDataSource<Job>;
  expandedElement: Job | null;

  error = '';
  loading = false;
  private jobSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private auth: AuthenticationService, private jobService: JobService, private reportService: ReportsService,
    private alertService: AlertService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef,
    private router: Router) { }
  // public dialogRef: MatDialogRef<MessageDialogComponent>
  // @Inject(MAT_DIALOG_DATA) public data: any

  ngOnInit() {
    this.jobSub = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.jobService.getJobs())).subscribe(resp => {
          this.dataSource = new MatTableDataSource(resp);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          // TODO: display our server error dialog?
          console.log(err);
        });
  }

  ngOnDestroy() {
    this.jobSub.unsubscribe();
  }

  getJobs(): Job[] {
    return this.dataSource.data;
  }

  getFilteredJobs(): Job[] {
    return this.dataSource.filteredData;
  }

  /**
   * Refresh the datasource
   */
  refresh() {
    this.jobService.getJobs().subscribe(resp => {
      // let jsonObj = JSON.parse(resp)
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
    this.changeDetectorRefs.detectChanges();
  }

  /**
   * expand collapse a row
   * @param row
   */
  toggleRow(row) {
    if (this.expandedElement === row) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
    }
    console.log(row);
    console.log(row.parameter_files);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * get the Job owner
   * @param element job element
   */
  getJobOwner(element: any) {
    return this.jobService.getJobOwner(element.id);
  }

  /**
   * Open the job results
   * @param element row element
   */
  openReport(element: Job) {
    this.reportService.getReportByJobId(element.id).subscribe(resp => {
      let report = resp;
      console.log("report id : " + report.id);
      this.router.navigate(['report-detail'], { queryParams: { 'id': report.id } });
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
  }

  /**
   * Run the job
   * @param element row element
   */
  runJob(element: any) {
    this.openRunJobDialog(element);
  }

  /**
   * Delete the job
   * @param element row parameter
   */
  deleteJob(element: any) {
    // open intermediary dialog
    this.openDeleteJobDialog(element);
  }

  /**
   * Cancel the job
   * @param element row parameter
   */
  cancelJob(element: any) {
    // open intermediary dialog
    this.openCancelJobDialog(element);
  }

  /**
   * Dialog used to display a confirmation to the user before applying the wanted action
   * @param data message to pass to dialog
   */
  private openRunJobDialog(element: any) {
    const msgData = { 'title': 'Run Analysis Job with parameter setup' };
    msgData['description'] = 'Run Analysis Job id "' + element.id + '" with the parameter setup id "' + element.parameter_file_id + '" ?';
    const jobService = this.jobService.runJob(element.id);
    this.openDialog(msgData, jobService);
    this.router.navigate(['jobs']);
  }

  /**
   * Dialog used to display a confirmation to the user before applying the wanted action
   * @param data message to pass to dialog
   */
  private openDeleteJobDialog(element: any) {
    const msgData = { 'title': 'Delete Job' };
    msgData['description'] = 'Delete the Job with id "' + element.id + '" ?';
    const jobService = this.jobService.deleteJob(element.id);
    this.openDialog(msgData, jobService);
  }

  /**
   * Dialog used to display a confirmation to the user before applying the wanted action
   * @param data message to pass to dialog
   */
  private openCancelJobDialog(element: any) {
    const msgData = { 'title': 'Cancel Analysis Job' };
    msgData['description'] = 'Cancel the Job named "' + element.name + '" ?';
    const jobService = this.jobService.cancelJob(element.id);
    this.openDialog(msgData, jobService);
  }

  viewAnalysisProgressDialog(element: any) {
    const msgData = { 'title': 'Analysis Progress' };
    msgData['description'] = 'This is the Job Progress "' + element.name;
    msgData['service'] = this.jobService;
    msgData['jobid'] = element.id;
    msgData['status'] = element.status;
    console.log(element.name);
    this.viewJobProgressDialog(msgData);
  }

  viewAnalysisLogDialog(element: any) {
    const msgData = { 'title': 'Analysis Logs' };
    msgData['description'] = 'This is the Analysis logs "' + element.name;
    msgData['service'] = this.jobService;
    msgData['jobid'] = element.id;
    msgData['status'] = element.status;
    console.log(element.name);
    this.viewJobProgressDialog(msgData);
  }

  /**
   * Dialog used to display a modal window showing the job progress
   * @param data message to pass to dialog
   */
  private viewJobProgressDialog(data: any) {
    const dialogRef = this.dialog.open(ProgressDialogComponent, {
      width:'400px',
      height:'500px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
       // do smthg
      }
    });
  }

  /**
   * Dialog used to display a confirmation to the user before applying the wanted action
   * @param data message to pass to dialog
   */
  private openDialog(msgData: any, service: Observable<any>) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        service.subscribe(data => {
          msgData['description'] = data['message'];
         // this.openResultDialog(msgData);
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

  /**
   * Returns true if progress is running or if username is "guest"
   */
  isDisabled(element: any) {
    return element.status=='In Progress' || this.auth.getUsername() == 'guest';
  }

  private openResultDialog(data: any) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      // refresh datasource
      this.refresh();
    });
  }

}
