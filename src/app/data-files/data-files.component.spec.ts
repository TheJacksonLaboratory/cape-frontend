import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFilesComponent } from './data-files.component';
import { MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule,
	MatPaginatorModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../_services';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ParametersComponent } from '../parameters/parameters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('DataFilesComponent', () => {
  let component: DataFilesComponent;
  let fixture: ComponentFixture<DataFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ DataFilesComponent ],
      providers: [
        AlertService,
        { provide: MatDialog, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
