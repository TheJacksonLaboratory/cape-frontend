import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import { DataFilesService, AlertService, AuthenticationService } from '../_services';
import { DataFile } from '../_models/datafile';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { Parameters } from '../_models/parameters';
import { JobService } from '../_services/job.service';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';


@Component({
  selector: 'app-data-files',
  templateUrl: './data-files.component.html',
  styleUrls: ['./data-files.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataFilesComponent implements OnInit, OnDestroy {
  columnsToDisplay = ['filename', 'owner', 'add', 'del'];

  dataSource: MatTableDataSource<DataFile>;
  expandedElement: DataFile | null;

  isDisabled: boolean;

  // spinnerDialogRef: any;

  error = '';
  loading = false;
  private dataFileSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private auth: AuthenticationService, private dataFilesService: DataFilesService, private jobService: JobService,
    private alertService: AlertService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef,
    private router: Router) { }
  // public dialogRef: MatDialogRef<MessageDialogComponent>
  // @Inject(MAT_DIALOG_DATA) public data: any

  ngOnInit() {
    this.isDisabled = this.auth.getUsername() == "guest";
    this.dataFileSub = this.dataFilesService.getDataFilesAndParameters().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
      this.error = err.error.message || err.error || err.message;
    });
    this.changeDetectorRefs.detectChanges();
  }

  ngOnDestroy() {
    this.dataFileSub.unsubscribe();
  }

  getDataFiles(): DataFile[] {
    return this.dataSource.data;
  }

  getFilteredDataFiles(): DataFile[] {
    return this.dataSource.filteredData;
  }

  /**
   * Refresh the datasource
   */
  refresh() {
    this.dataFilesService.getDataFilesAndParameters().subscribe(resp => {
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
  * Download corresponding YAML file
  * @param element row element
  */
  downloadParameterFile(element: any) {
    const data = element.yaml_file;
    const filename = element.title + '.yml';
    const blob = new Blob([data], { type: 'text/yaml' });
    saveAs(blob, filename);
  }

  /**
   * Adds a parameter set up to the selected datafile:
   * Opens the Parameter UI with the selected data file
   * @param element data file
   */
  addParameterFile(element: any) {
    const blankParameterFile = new Parameters();
    blankParameterFile.datafile_id = element.id;
    this.router.navigate(['parameters'], { queryParams: { 'parameters': JSON.stringify(blankParameterFile) } });
  }

  /**
   * Edit selected parameter file
   * @param element row elemet
   */
  editParameterFile(element: any) {
    this.router.navigate(['parameters'], { queryParams: { 'parameters': JSON.stringify(element) } });
  }

  /**
   * Delete a parameter file in the table and the DB
   * @param element row parameter
   */
  deleteParameterFile(element: any) {
    // open intermediary dialog
    this.openDeleteWarningDialog(element);
  }

  /**
   * Delete dta file
   * @param element row element
   */
  deleteFile(element: any) {
    this.openDeleteFileWarningDialog(element);
  }

  /**
   * Returns the current user: first name and last name
   * as a string
   */
  getCurrentUser() {
    return this.auth.getUserFullname();
  }

  /**
   * Run a job with this file as input
   * @param element row element
   */
  runParameterFile(element: any) {
    this.openCreateRunJobDialog(element);
  }

  /**
   * Dialog used to display a confirmation to the user before applying the wanted action
   * @param data message to pass to dialog
   */
  private openDeleteWarningDialog(element: any) {
    const msgData = { 'title': 'Delete Parameter File' };
    msgData['description'] = 'Delete the Parameter File named "' + element.title + '" ?';
    const dataFileService = this.dataFilesService.deleteParameterDataFile(element.id, element.user_id);
    this.openDialog(msgData, dataFileService);
  }

  private openDeleteFileWarningDialog(element: any) {
    const msgData = { 'title': 'Delete Data File' };
    msgData['description'] = 'Delete the Data File named "' + element.filename + '" ?';
    const userId = this.auth.getUserId();

    // const dialogRef = this.openDialog(msgData, dataFileService);
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        //this.openSpinnerDialog();
        this.dataFilesService.deleteDataFile(element.id, userId).subscribe(data => {
          msgData['description'] = data['message'];
          console.log(data['message']);
          this.refresh();
          //this.spinnerDialogRef.close();
          // this.openResultDialog(msgData);
        }, error => {
          this.error = error;
          this.alertService.error(error);
          this.loading = false;
          msgData['title'] = 'Error';
          msgData['description'] = error;
          //this.spinnerDialogRef.close();
          this.openResultDialog(msgData);
        });
      }
    });
  }

  //  openSpinnerDialog() {
  //    console.log("open spinner dialog");
  //    this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
  //      panelClass: 'transparent',
  //      disableClose: true
  //    });
  //  }

  /**
   * 
   * @param ms Delay function to be called in an async block
   */
  private delay(ms: number) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Dialog used to display a confirmation to the user before applying the wanted action
   * @param data message to pass to dialog
   */
  private openCreateRunJobDialog(element: any) {
    const msgData = { 'title': 'Create and Run Job with parameter setup' };
    msgData['description'] = 'Create and run Job with the parameter setup named "' + element.title + '" ?';
    const jobService = this.jobService.createRunJob(element.id);
    this.openDialog(msgData, jobService);
    this.router.navigate(['jobs']);
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
    return dialogRef;
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

  /**
   * Open dialog to upload a new file
   */
  public openDataFileUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '50%',
      height: '65%',
      data: { fileType: 'csv, zip, rds, rdata', titleText: 'Upload data Files' }
    });
    dialogRef.afterClosed().subscribe(result => {
      // refresh datasource
      //wait 2 sec
      (async () => {
        await this.delay(2000);
        this.refresh();
      })();
    });
  }

}
