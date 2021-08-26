import { Routes } from '@angular/router';
import { AboutComponent } from '../../about/about.component';
import { ReportGridComponent } from '../../reports/report-grid/report-grid.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { AuthGuard } from '../../_guards';
import { ParametersComponent } from 'src/app/parameters/parameters.component';
import { DataFilesComponent } from '../../data-files/data-files.component';
import { JobComponent } from '../../job/job.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { ReportDetailComponent } from 'src/app/reports/report-detail/report-detail.component';
import { CapeApiComponent } from 'src/app/cape-api';

export const BaseLayoutRoutes: Routes = [
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'cape-api', component: CapeApiComponent, canActivate: [AuthGuard] },
    { path: 'datafiles', component: DataFilesComponent, canActivate: [AuthGuard] },
    { path: 'parameters', component: ParametersComponent, canActivate: [AuthGuard] },
    { path: 'jobs', component: JobComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportGridComponent, canActivate: [AuthGuard] },
    { path: 'report-detail', component: ReportDetailComponent, canActivate: [AuthGuard] },
    // { path: 'administration', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }}
];
