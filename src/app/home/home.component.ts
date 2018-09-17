import { Component, OnInit } from '@angular/core';
import { ReportsService } from "../_services/reports.service";


export interface Report {
  id: string;
  title: string;
  description: string;
  image: any;
}

@Component({templateUrl: 'home.component.html'})
export class HomeComponent {

    constructor() {}
}
