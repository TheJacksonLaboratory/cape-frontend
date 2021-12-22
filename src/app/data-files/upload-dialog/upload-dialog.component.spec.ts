import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataFilesService } from 'src/app/_services';

import { UploadDialogComponent } from './upload-dialog.component';

describe('UploadDialogComponent', () => {
  let component: UploadDialogComponent;
  let fixture: ComponentFixture<UploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDialogComponent ],
      imports: [
        MatProgressBarModule,
        MatDialogModule
      ],
      providers: [
        DataFilesService,
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef,useValue: {} },
        HttpHandler,
        HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
