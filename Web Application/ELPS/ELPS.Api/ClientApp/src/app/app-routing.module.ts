import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { PageNotFoundComponent } from './views/pages/page-not-found/page-not-found.component';
import { HomeComponent } from './views/pages/home/home.component';
import { AuthGuard } from './views/services/auth.guard';
import { SidenavComponent } from './views/pages/dashboard/sidenav/sidenav.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard/dashboard.component';
import { ElephantRecordsComponent } from './views/pages/dashboard/elephant-records/elephant-records.component';
import { ElephantRegisterComponent } from './views/pages/dashboard/elephant-register/elephant-register.component';
import { WildOfficersComponent } from './views/pages/dashboard/wild-officers/wild-officers.component';

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
    redirectTo: 'login', // kalin tibbe login
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthGuard]
  // },
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
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
