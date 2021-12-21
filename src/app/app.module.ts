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
    ReportsService, ParametersService
} from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CustomMaterialModule } from './material.module';
import { UsersComponent } from './users/users.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParametersModule } from './parameters';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './_guards';
import { RegisterComponent } from './register/register.component'
import { ConfirmComponent } from './confirm/confirm.component';


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
        ParametersModule,
        SharedModule,
        MatProgressBarModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        UsersComponent,
        BaseLayoutComponent,
        FooterComponent,
        SidebarComponent,
        NavbarComponent,
        RegisterComponent,
        ConfirmComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AlertService,
        AuthGuard,
        AuthenticationService,
        GroupService,
        ReportsService,
        UserService,
        ParametersService,

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
