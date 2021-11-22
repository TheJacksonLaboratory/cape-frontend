import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DataFilesService } from 'src/app/_services';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

  // @ViewChild('filesUploadBtn', { static: true }) filesUploadBtn;

  public files: Set<File> = new Set();
  public file: File;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  fileType = '';
  titleText = '';
  csvFileExample: string;
  rQtl2FileExample: string;
  rdsDataFileExample: string;
  rdsGenoFileExample: string;

  spinnerDialogRef: any;
  allProgressErrors;
  allProgressInfo;

  percentCompleted: number = 0;
  isMultipleUploaded = false;
  isSingleUploaded = false;
  urlAfterUpload = '';
  percentUploaded = [0];
  showProgress = false;
  acceptedExtensions = "csv, zip, rdata, rds";

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>,
    public datafileService: DataFilesService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) {

    this.fileType = this.data.fileType;
    this.titleText = this.data.titleText;
    this.csvFileExample = environment.FILE_URL + '/NON_NZO_Reifsnyder_pgm_CAPE_num.csv';
    this.rQtl2FileExample = environment.FILE_URL + '/iron.zip';
    this.rdsDataFileExample = environment.FILE_URL + '/cape_data.RDS';
    this.rdsGenoFileExample = environment.FILE_URL + '/cape_geno.RDS';
  }

  ngOnInit() {
    this.showProgress = false;
  }

  uploadFile($event) {
    console.log('---Uploading one or more files---');
    this.files = $event.target.files;
    for (let i = 0; i < this.files.size; i++) {
      console.log(this.files[i].name);
    }

    this.isSingleUploaded = false;
    this.urlAfterUpload = '';

    this.datafileService.uploadWithProgress(this.files)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentCompleted = Math.round(100 * event.loaded / event.total);
          this.showProgress = true;
          this.uploading = true;
          console.log(this.percentCompleted + "%");
        } else if (event instanceof HttpResponse) {
          this.isSingleUploaded = true;
          this.urlAfterUpload = event.body.link;
        }
        if (this.percentCompleted == 100) {
          this.uploadSuccessful = true;
          this.dialogRef.close(true);
        }
      },
        (error) => {
          this.dialogRef.close(true);
        });
  }

}
