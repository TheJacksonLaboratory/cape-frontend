import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { RegisterComponent } from './register/register.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about';
import { CapeApiComponent } from './cape-api';
import { DataFilesComponent } from './data-files';
import { ParametersComponent } from './parameters/parameters.component';
import { JobComponent } from './job/job.component';
import { ReportGridComponent } from './reports/report-grid/report-grid.component';
import { ReportDetailComponent } from './reports/report-detail/report-detail.component';

const appRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'cape-api', component: CapeApiComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'confirm/:token', component: ConfirmComponent },
    { path: 'datafiles', component: DataFilesComponent, canActivate: [AuthGuard] },
    { path: 'parameters', component: ParametersComponent, canActivate: [AuthGuard] },
    { path: 'jobs', component: JobComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportGridComponent, canActivate: [AuthGuard] },
    { path: 'report-detail', component: ReportDetailComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
