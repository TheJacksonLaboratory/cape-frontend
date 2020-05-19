import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGridComponent } from './report-grid.component';
import { ReportSummaryComponent } from '../report-summary/report-summary.component';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ReportGridComponent', () => {
  let component: ReportGridComponent;
  let fixture: ComponentFixture<ReportGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        ReportGridComponent,
        ReportSummaryComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
