import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './views/services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './views/pages/login/login.component';
import { PageNotFoundComponent } from './views/pages/page-not-found/page-not-found.component';
import { HomeComponent } from './views/pages/home/home.component';
import { SidenavComponent } from './views/pages/dashboard/sidenav/sidenav.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard/dashboard.component';
import { ElephantRecordsComponent } from './views/pages/dashboard/elephant-records/elephant-records.component';
import { ElephantRegisterComponent } from './views/pages/dashboard/elephant-register/elephant-register.component';
import { WildOfficersComponent } from './views/pages/dashboard/wild-officers/wild-officers.component';
import { BodyComponent } from './views/pages/dashboard/body/body.component';
import { ViewErComponent } from './views/pages/dashboard/view-er/view-er.component';
import { ViewErecordComponent } from './views/pages/dashboard/view-erecord/view-erecord.component';
import { SettingsComponent } from './views/pages/dashboard/settings/settings.component';
import { LocationComponent } from './views/pages/dashboard/location/location.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    SidenavComponent,
    DashboardComponent,
    ElephantRecordsComponent,
    ElephantRegisterComponent,
    WildOfficersComponent,
    BodyComponent,
    ViewErComponent,
    ViewErecordComponent,
    SettingsComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    MatSnackBarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
