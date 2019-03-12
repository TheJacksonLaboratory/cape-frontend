import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService } from "./_services";
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomMaterialModule } from "./material.module";
import { UsersComponent } from './users/users.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { FooterComponent } from "./components/footer/footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

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
        BaseLayoutComponent,
        FooterComponent,
        SidebarComponent,
        NavbarComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AlertService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
