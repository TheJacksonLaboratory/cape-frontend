import { Injectable } from '@angular/core';
import { REPORTS } from './reports.mock';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  reports = REPORTS['0']['data'];

  constructor() {}

  getAll() {
    return this.reports;
  }

}
