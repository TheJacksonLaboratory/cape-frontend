import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  public title = '';
  public description = '';

  constructor(public dialogRef: MatDialogRef<DescriptionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data !== undefined) {
      this.description = this.data.description;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
