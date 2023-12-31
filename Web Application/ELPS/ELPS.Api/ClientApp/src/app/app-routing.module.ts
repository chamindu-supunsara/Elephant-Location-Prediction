import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { PageNotFoundComponent } from './views/pages/page-not-found/page-not-found.component';
import { AuthGuard } from './views/services/auth.guard';
import { DashboardComponent } from './views/pages/dashboard/dashboard/dashboard.component';
import { ElephantRecordsComponent } from './views/pages/dashboard/elephant-records/elephant-records.component';
import { ElephantRegisterComponent } from './views/pages/dashboard/elephant-register/elephant-register.component';
import { WildOfficersComponent } from './views/pages/dashboard/wild-officers/wild-officers.component';
import { ViewErComponent } from './views/pages/dashboard/view-er/view-er.component';
import { ViewErecordComponent } from './views/pages/dashboard/view-erecord/view-erecord.component';
import { LocationComponent } from './views/pages/dashboard/location/location.component';
import { SettingsComponent } from './views/pages/dashboard/settings/settings.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'record',
    component: ElephantRecordsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'elephant-register',
    component: ElephantRegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'officers',
    component: WildOfficersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-er',
    component: ViewErComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-erecord',
    component: ViewErecordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'location',
    component: LocationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
