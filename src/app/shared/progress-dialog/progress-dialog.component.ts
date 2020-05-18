import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { JobService } from 'src/app/_services';

@Component({
  selector: 'app-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.scss']
})
export class ProgressDialogComponent implements OnInit, OnDestroy {

  messageTitle: string;
  messageDescription: string;

  private jobSub: Subscription;
  private jobService: JobService;
  private jobId: number;
  private status: string;

  constructor(
    public dialogRef: MatDialogRef<ProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.messageTitle = data['title'];
    this.jobService = data['service'];
    this.jobId = data['jobid'];
    this.status = data['status'];
  }

  ngOnInit() {
    if (this.status == "In Progress") {
      this.jobSub = interval(5000)
        .pipe(
          startWith(0),
          switchMap(() => this.jobService.getJobProgress(this.jobId))).subscribe(resp => {
            this.messageDescription = resp['message'];
          }, err => {
            // TODO: display our server error dialog?
            console.log(err);
          });
    } else {
      this.jobSub = this.jobService.getJobProgress(this.jobId).subscribe(resp => {
        this.messageDescription = resp['message'];
      }, err => {
        // TODO: display our server error dialog?
        console.log(err);
      });
    }

  }

  ngOnDestroy(): void {
    this.jobSub.unsubscribe();
  }

  onOkClick(): void {
    this.dialogRef.close('ok');
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }
}

