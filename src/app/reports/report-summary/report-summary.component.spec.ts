import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { Observable, of } from 'rxjs';

import { ReportSummaryComponent } from './report-summary.component';
import { Report } from 'src/app/_models/report';
import { ReportsService } from 'src/app/_services';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ReportSummaryComponent', () => {
  let component: ReportSummaryComponent;
  let fixture: ComponentFixture<ReportSummaryComponent>;
  let reportsService: ReportsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatTooltipModule,
        MatDialogModule
      ],
      declarations: [ReportSummaryComponent],
      providers: [
        { provide: ReportsService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSummaryComponent);
    component = fixture.componentInstance;
    component.report = new Report();
    component.report.id = 1;
    component.report.title = 'Report One';
    component.report.author = 'Alice Apple';
    component.report.description = 'Dignissim posuere vestibulum eget, sollicitudin rutrum. Justo, malesuada. Adipisicing netus et malesuada fames est. Consectetuer. Ornare. Etiam faucibus. Aliquam commodo lacus sit amet, nec, risus. Scelerisque eget, urna. Sollicitudin tortor at nulla ut accumsan, neque id turpis egestas.';
    component.report.paths = [ "/path/to/report" ]

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
