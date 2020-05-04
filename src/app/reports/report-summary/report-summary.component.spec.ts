import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { Observable, of } from 'rxjs';

import { ReportSummaryComponent } from './report-summary.component';
import { Report } from 'src/app/_models/report';
import { ReportsService } from 'src/app/_services';

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

describe('ReportSummaryComponent', () => {
  let component: ReportSummaryComponent;
  let fixture: ComponentFixture<ReportSummaryComponent>;
  let reportsService: ReportsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [ReportSummaryComponent],
      providers: [
        { provide: ReportsService, useClass: MockReportService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSummaryComponent);
    component = fixture.componentInstance;
    component.report = new Report();
    report.id = 1;
    report.title = 'Report One';
    report.author = 'Alice Apple';
    report.description = 'Dignissim posuere vestibulum eget, sollicitudin rutrum. Justo, malesuada. Adipisicing netus et malesuada fames est. Consectetuer. Ornare. Etiam faucibus. Aliquam commodo lacus sit amet, nec, risus. Scelerisque eget, urna. Sollicitudin tortor at nulla ut accumsan, neque id turpis egestas.';

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
