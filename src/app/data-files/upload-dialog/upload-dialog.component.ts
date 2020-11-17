import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../upload/upload.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { DataFilesService } from 'src/app/_services';
import { HttpEventType, HttpResponse } from '@angular/common/http';

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
  allProgressErrors;
  allProgressInfo;

  percentCompleted: number = 0;
  isMultipleUploaded = false;
  isSingleUploaded = false;
  urlAfterUpload = '';
  percentUploaded = [0];
  acceptedExtensions = "csv, zip";

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>, public datafileService: DataFilesService, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.fileType = this.data.fileType;
    this.titleText = this.data.titleText;
  }

  ngOnInit() {
  }

  uploadFile($event) {
    console.log('---Uploading single file---');
    this.file = $event.target.files[0];
    console.log(this.file.name);
    this.isSingleUploaded = false;
    this.urlAfterUpload = '';

    this.datafileService.uploadWithProgress(this.file)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentCompleted = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.isSingleUploaded = true;
          this.urlAfterUpload = event.body.link;
        }
        if (this.percentCompleted == 100) {
          this.uploadSuccessful = true;
          this.dialogRef.close(true);
        }
      });
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close(true);
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.datafileService.uploadDataFile(this.file, this.fileType, null);

    // convert the progress map into an array
    const allProgressObservables = [];
    this.allProgressErrors = [];
    this.allProgressInfo = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;


    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe((end: any) => {

      console.log("fork end")
      //console.log(end);

      end.forEach((res: any) => {
        if (res.data) {

          if (res.data.errors) {
            res.data.errors.forEach(error => {
              this.allProgressErrors.push(error);
            });
          }

          if (res.data.message) {
            this.allProgressInfo.push(res.data.message);
          }
        }
      });

      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      if (this.fileType === 'vcf') {
        // //emit file changes event
        this.datafileService.isThereFileChanges.next(true);
      }

      // ... and the component is no longer uploading
      this.uploading = false;

      console.log('allProgressErrors')
      console.log(this.allProgressErrors)
    }, error => {
      this.allProgressErrors.push(error.error);

      console.log('allProgressErrors')
      console.log(this.allProgressErrors)

      this.canBeClosed = true;
      this.uploadSuccessful = true;
    },
      () => console.log('end')
    );
  }



}
