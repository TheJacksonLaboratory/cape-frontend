import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { saveAs } from 'file-saver';

import { DataFilesService, AlertService } from '../_services';
import { DataFile } from '../_models/datafile';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';


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
  columnsToDisplay = ['id', 'filename'];

  dataSource: MatTableDataSource<DataFile>;
  expandedElement: DataFile | null;

  error = '';
  loading = false;
  private dataFileSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private dataFilesService: DataFilesService,
    private alertService: AlertService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef,
    private router: Router) { }
    // public dialogRef: MatDialogRef<MessageDialogComponent>
    // @Inject(MAT_DIALOG_DATA) public data: any

  ngOnInit() {
    this.dataFileSub = this.dataFilesService.getDataFilesAndParameters().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.dataFileSub.unsubscribe();
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
   * Run a job with this file as input
   * @param element row element
   */
  runParameterFile(element: any) {
    // TODO
  }

  /**
   * Dialog used to display a confirmation to the user before applying the wanted action
   * @param data message to pass to dialog
   */
  private openDeleteWarningDialog(element: any) {
    const msgData = { 'title': 'Delete Parameter File' };
    msgData['description'] = 'Delete the Parameter File named "' + element.title + '" ?';
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        const resp = this.dataFilesService.deleteDataFile(element.id, element.user_id).subscribe(data => {
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

  // onOkClick(): void {
  //   this.dialogRef.close('ok');
  // }

}