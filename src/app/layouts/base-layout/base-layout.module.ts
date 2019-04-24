import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseLayoutRoutes } from './base-layout.routing';
import { ReportsService} from '../../_services/reports.service';
import { ReportGridComponent } from '../../reports/report-grid/report-grid.component';
import { ReportListComponent } from '../../reports/report-list/report-list.component';
import { ReportSummaryComponent } from '../../reports/report-summary/report-summary.component';
import { CustomMaterialModule } from '../../material.module';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { GroupListComponent} from '../../groups/group-list/group-list.component';
import { FileParameterModule } from '../../parameters/file-parameter/file-parameter.module';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BaseLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    CustomMaterialModule,
    FileParameterModule
  ],
  declarations: [
    ReportGridComponent,
    ReportListComponent,
    ReportSummaryComponent,
    UserProfileComponent,
    GroupListComponent
  ],
  providers: [
    ReportsService
  ]
})

export class BaseLayoutModule {}
