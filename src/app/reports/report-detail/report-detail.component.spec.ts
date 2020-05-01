import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { Observable, of } from 'rxjs';

import { ReportDetailComponent } from './report-detail.component';
import { Report } from 'src/app/_models/report';
import { ReportsService } from 'src/app/_services';

const report = new Report(1, 'Report One', 'Alice Apple', 'Dignissim posuere vestibulum eget, sollicitudin rutrum. Justo, malesuada. Adipisicing netus et malesuada fames est. Consectetuer. Ornare. Etiam faucibus. Aliquam commodo lacus sit amet, nec, risus. Scelerisque eget, urna. Sollicitudin tortor at nulla ut accumsan, neque id turpis egestas.');

class MockReportService {
  getReport(): Observable<Report> {
      return of(report);
  }
}

describe('ReportSummaryComponent', () => {
  let component: ReportDetailComponent;
  let fixture: ComponentFixture<ReportDetailComponent>;
  let reportsService: ReportsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule
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
    component.report = new Report(1, 'Report One', 'Alice Apple', 'Dignissim posuere vestibulum eget, sollicitudin rutrum. Justo, malesuada. Adipisicing netus et malesuada fames est. Consectetuer. Ornare. Etiam faucibus. Aliquam commodo lacus sit amet, nec, risus. Scelerisque eget, urna. Sollicitudin tortor at nulla ut accumsan, neque id turpis egestas.');
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
