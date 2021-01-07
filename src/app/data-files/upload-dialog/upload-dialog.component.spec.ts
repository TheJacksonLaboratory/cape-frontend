import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatProgressBarModule } from '@angular/material';
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

      ],
      providers: [
        DataFilesService,
        { provide: MatDialog, useValue: {} },
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
