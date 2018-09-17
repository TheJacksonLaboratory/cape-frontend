import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomMaterialModule } from "./material.module";
import { UsersComponent } from './users/users.component';;
import { GroupListComponent } from './groups/group-list/group-list.component'
import { ReportsService } from "./_services/reports.service";;
import { ReportListComponent } from './reports/report-list/report-list.component';
import { ReportSummaryComponent } from './reports/report-summary/report-summary.component';;
import { ReportGridComponent } from './reports/report-grid/report-grid.component'


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        FormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        UsersComponent ,
        GroupListComponent ,
        ReportListComponent ,
        ReportSummaryComponent,
        ReportGridComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ReportsService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
