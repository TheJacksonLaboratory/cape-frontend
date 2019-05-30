import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { DataFilesService, AlertService } from '../_services';
import { Parameters } from '../_models/parameters';
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
  columnsToDisplay = ['id', 'title', 'date_created', 'full_name', 'actions'];
  expandedElement: Parameters | null;

  dataSource: MatTableDataSource<Parameters>;

  error = '';
  loading = false;
  private paramsSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private dataFilesService: DataFilesService,
    private alertService: AlertService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
    this.paramsSub = this.dataFilesService.getDataFiles().subscribe(resp => {
      // transform 
      // JSON.parse(resp);
      this.dataSource = new MatTableDataSource(resp);
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  /**
   * Refresh the datasource
   */
  refresh() {
    this.dataFilesService.getDataFiles().subscribe(resp => {
      // let jsonObj = JSON.parse(resp)
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
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

  editParameterFile(element: any) {

  }

  /**
   * Delete a parameter file in the table and the DB
   * @param element row parameter
   */
  deleteParameterFile(element: any) {
    // open intermediary dialog
    this.openWarningDialog(element);
  }

  /**
   * Dialog used to display a confirmation to the user before applying the wanted action
   * @param data message to pass to dialog
   */
  private openWarningDialog(element: any) {
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
}
