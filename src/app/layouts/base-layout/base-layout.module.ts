import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AboutComponent } from '../../about/about.component';
import { BaseLayoutRoutes } from './base-layout.routing';
import { ReportsService} from '../../_services/reports.service';
import { ReportGridComponent } from '../../reports/report-grid/report-grid.component';
import { ReportListComponent } from '../../reports/report-list/report-list.component';
import { ReportSummaryComponent } from '../../reports/report-summary/report-summary.component';
import { CustomMaterialModule } from '../../material.module';
import { CapeApiComponent } from 'src/app/cape-api';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { GroupListComponent} from '../../groups/group-list/group-list.component';
import { ParametersModule } from 'src/app/parameters';
import { DataFilesComponent } from 'src/app/data-files';
import { DataFilesService } from 'src/app/_services';
import { ParametersService } from '../../_services/parameters.service';
import { AdminComponent } from '../../admin/admin.component';
import { JobComponent } from 'src/app/job/job.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { ReportDetailComponent } from 'src/app/reports/report-detail/report-detail.component';
import { UploadDialogComponent } from 'src/app/data-files/upload-dialog/upload-dialog.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { TableOfContentsComponent } from 'src/app/components/table-of-contents/table-of-contents.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BaseLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    CustomMaterialModule,
    ParametersModule,
    MatProgressSpinnerModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule
  ],
  declarations: [
    AboutComponent,
    ReportGridComponent,
    ReportDetailComponent,
    DashboardComponent,
    ReportListComponent,
    ReportSummaryComponent,
    UserProfileComponent,
    GroupListComponent,
    CapeApiComponent,
    DataFilesComponent,
    UploadDialogComponent,
    AdminComponent,
    JobComponent,
    TableOfContentsComponent

  ],
  providers: [
    ReportsService,
    DataFilesService,
    ParametersService
  ],
  entryComponents: [
    UploadDialogComponent
    ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})

export class BaseLayoutModule {}
