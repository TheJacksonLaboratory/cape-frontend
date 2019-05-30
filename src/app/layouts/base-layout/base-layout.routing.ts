import { Routes } from '@angular/router';
import { ReportGridComponent } from '../../reports/report-grid/report-grid.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { GroupListComponent } from '../../groups/group-list/group-list.component';
import { AuthGuard } from '../../_guards';
import { ParametersComponent } from 'src/app/parameters/parameters.component';
import { DataFilesComponent } from '../../data-files/data-files.component';

export const BaseLayoutRoutes: Routes = [

    { path: 'dashboard', component: ReportGridComponent, canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'groups', component: GroupListComponent, canActivate: [AuthGuard] },
    { path: 'parameters', component: ParametersComponent, canActivate: [AuthGuard] },
    { path: 'datafiles', component: DataFilesComponent, canActivate: [AuthGuard] }
];
