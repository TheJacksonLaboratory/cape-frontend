import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, GroupService, ReportsService, ParametersService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './material.module';
import { UsersComponent } from './users/users.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParametersModule } from './parameters';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        FormsModule,
        HttpClientModule,
        routing,
        ParametersModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        UsersComponent,
        BaseLayoutComponent,
        FooterComponent,
        SidebarComponent,
        NavbarComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AlertService,
        AuthenticationService,
        GroupService,
        ReportsService,
        UserService,
        ParametersService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
