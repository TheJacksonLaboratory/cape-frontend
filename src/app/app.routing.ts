import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmComponent } from './confirm/confirm.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'confirm/:token', component: ConfirmComponent },
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
        loadChildren: () => import('./layouts/base-layout/base-layout.module').then(m => m.BaseLayoutModule)
    }]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
