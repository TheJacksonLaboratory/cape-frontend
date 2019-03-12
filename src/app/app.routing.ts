import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { BaseLayoutComponent } from "./layouts/base-layout/base-layout.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },

    // API endpoints
    { path: 'users', component: HomeComponent },

    {
      path: '',
      canActivate: [AuthGuard],
      component: BaseLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: './layouts/base-layout/base-layout.module#BaseLayoutModule'
    }]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
