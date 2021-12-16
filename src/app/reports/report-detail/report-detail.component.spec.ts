import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatGridListModule } from '@angular/material';
import { Observable, of } from 'rxjs';

import { ReportDetailComponent } from './report-detail.component';
import { Report } from 'src/app/_models/report';
import { ReportsService } from 'src/app/_services';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let report: Report;

class MockReportService {
  getReport(): Observable<Report> {
      report = new Report();
      report.id = 1;
      report.title = 'Report One';
      report.author = 'Alice Apple';
      report.description = 'Dignissim posuere vestibulum eget, sollicitudin rutrum. Justo, malesuada. Adipisicing netus et malesuada fames est. Consectetuer. Ornare. Etiam faucibus. Aliquam commodo lacus sit amet, nec, risus. Scelerisque eget, urna. Sollicitudin tortor at nulla ut accumsan, neque id turpis egestas.';
      return of(report);
  }
}

describe('ReportDetailComponent', () => {
  let component: ReportDetailComponent;
  let fixture: ComponentFixture<ReportDetailComponent>;
  let reportsService: ReportsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatGridListModule
      ],
      declarations: [ReportDetailComponent],
      providers: [
        { provide: ReportsService, useClass: MockReportService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailComponent);
    component = fixture.componentInstance;
    component.report = new Report();
    component.report.id = 1;
    component.report.title = 'Report One';
    component.report.author = 'Alice Apple';
    component.report.description = 'Dignissim posuere vestibulum eget, sollicitudin rutrum. Justo, malesuada. Adipisicing netus et malesuada fames est. Consectetuer. Ornare. Etiam faucibus. Aliquam commodo lacus sit amet, nec, risus. Scelerisque eget, urna. Sollicitudin tortor at nulla ut accumsan, neque id turpis egestas.';

    reportsService = TestBed.get(ReportsService);
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
