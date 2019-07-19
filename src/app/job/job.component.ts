import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { JobService, AlertService } from '../_services';
import { Job } from '../_models/job';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {
  columnsToDisplay = ['id', 'name', 'date_created', 'user_id', 'parameter_id', 'status', 'actions'];

  dataSource: MatTableDataSource<Job>;
  expandedElement: Job | null;

  error = '';
  loading = false;
  private jobSub: Subscription;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private http: HttpClient, private jobService: JobService,
    private alertService: AlertService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef,
    private router: Router) { }
  // public dialogRef: MatDialogRef<MessageDialogComponent>
  // @Inject(MAT_DIALOG_DATA) public data: any

  ngOnInit() {
    this.jobSub = this.jobService.getJobs().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
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

  //  isExpansionDetailRow = (i: number, row: Object) =>
  //    row.hasOwnProperty('detailRow');

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
   * Delete a parameter file in the table and the DB
   * @param element row parameter
   */
  deleteJob(element: any) {
    // open intermediary dialog
    this.openDeleteWarningDialog(element);
  }

  /**
   * Run a job with this file as input
   * @param element row element
   */
  runJob(element: any) {
    // TODO
  }

  /**
   * Dialog used to display a confirmation to the user before applying the wanted action
   * @param data message to pass to dialog
   */
  private openDeleteWarningDialog(element: any) {
    const msgData = { 'title': 'Delete Job' };
    msgData['description'] = 'Delete the Job named "' + element.name + '" ?';
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        const resp = this.jobService.deleteJob(element.id, element.user_id).subscribe(data => {
          msgData['description'] = data['message'];
          this.openResultDialog(msgData);
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
      this.refresh();
    });
  }

}
