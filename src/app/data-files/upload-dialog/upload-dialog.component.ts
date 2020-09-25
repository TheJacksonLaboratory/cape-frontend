import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../upload/upload.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

  @ViewChild('filesUploadBtn', {static: true}) filesUploadBtn;

  public files: Set<File> = new Set();

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

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>, public uploadService: UploadService, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.fileType = this.data.fileType;
    this.titleText = this.data.titleText;
  }

  ngOnInit() {
  }

  addFiles() {
    if (this.fileType === 'vcf') {
        this.filesUploadBtn.nativeElement.multiple = true;
    }
    this.filesUploadBtn.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.filesUploadBtn.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }


  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close(true);
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files, this.fileType);

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
    forkJoin(allProgressObservables).subscribe((end: any) =>{

      console.log("fork end")
      //console.log(end);

      end.forEach((res: any) => {
        if (res.data) {

          if (res.data.errors) {
              res.data.errors.forEach(error => {
                  this.allProgressErrors.push(error);
              });
          }

          if (res.data.message){
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
          this.uploadService.isThereFileChanges.next(true);
      }

      if (this.fileType === 'sample'){
          // //emit sample changes event
          this.uploadService.isThereSampleChanges.next(true);
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
