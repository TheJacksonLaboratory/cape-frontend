import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDialogComponent } from './progress-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { JobService } from 'src/app/_services';

let DIALOG_DATA = {
  "jobid": 1,
  "service": TestBed.get(JobService),
  "status": "In Progress"
};

describe('ProgressDialogComponent', () => {
  let component: ProgressDialogComponent;
  let fixture: ComponentFixture<ProgressDialogComponent>;
  let jobService: JobService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule
      ],
      declarations: [ ProgressDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: DIALOG_DATA },
        {  provide: JobService }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
