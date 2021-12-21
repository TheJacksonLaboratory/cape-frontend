import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsService, HttpHandler, HttpClient]
    });
  });

  it('should be created', inject([ReportsService], (service: ReportsService) => {
    expect(service).toBeTruthy();
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
