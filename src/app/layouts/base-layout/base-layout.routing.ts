import { Routes } from '@angular/router';
import {ReportGridComponent} from "../../reports/report-grid/report-grid.component";
import {UserProfileComponent} from "../../components/user-profile/user-profile.component";
import {GroupListComponent} from "../../groups/group-list/group-list.component";
import {AuthGuard} from "../../_guards";

export const BaseLayoutRoutes: Routes = [

    { path: 'dashboard',      component: ReportGridComponent },
    { path: 'user-profile',      component: UserProfileComponent },
    { path: 'groups', component: GroupListComponent , canActivate: [AuthGuard] },
];
