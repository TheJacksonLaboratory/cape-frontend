﻿import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import {
    AlertService, AuthenticationService, UserService, GroupService,
    ReportsService, ParametersService, DataFilesService, JobService
} from './_services';
import { LoginComponent } from './login';
import { CustomMaterialModule } from './material.module';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './_guards';
import { RegisterComponent } from './register/register.component'
import { ConfirmComponent } from './confirm/confirm.component';
import { TreeSelectionService } from './_services/tree-selection.service';
import { UploadDialogComponent } from './data-files/upload-dialog/upload-dialog.component';
import { AdminComponent } from './admin';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DataFilesComponent } from './data-files';
import { GroupListComponent } from './groups/group-list';
import { JobComponent } from './job/job.component';
import { ReportDetailComponent } from './reports/report-detail/report-detail.component';
import { ReportGridComponent } from './reports/report-grid/report-grid.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { ReportSummaryComponent } from './reports/report-summary/report-summary.component';
import { AboutComponent } from './about';
import { CapeApiComponent } from './cape-api';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { MatChipsModule } from '@angular/material/chips';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { MatTreeModule } from '@angular/material/tree';
import { ParametersModule } from './parameters';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        FormsModule,
        HttpClientModule,
        routing,
        SharedModule,
        MatProgressBarModule,
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatRippleModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        NgxPageScrollCoreModule,
        NgxPageScrollModule,
        ParametersModule,
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        DashboardComponent,
        CapeApiComponent,
        TableOfContentsComponent,
        LoginComponent,
        RegisterComponent,
        ConfirmComponent,
        ReportGridComponent,
        ReportDetailComponent,
        ReportListComponent,
        ReportSummaryComponent,
        UserProfileComponent,
        GroupListComponent,
        DataFilesComponent,
        UploadDialogComponent,
        AdminComponent,
        JobComponent,
        UserProfileComponent,
        FooterComponent,
        SidebarComponent,
        NavbarComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AlertService,
        AuthGuard,
        AuthenticationService,
        DataFilesService,
        ParametersService,
        GroupService,
        JobService,
        TreeSelectionService,
        ReportsService,
        UserService,

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    entryComponents: [
        UploadDialogComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

    bootstrap: [AppComponent]
})

export class AppModule { }
