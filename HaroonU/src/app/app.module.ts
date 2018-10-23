import { MaterialModule } from './shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'angular-highcharts';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { DashboardComponent } from './components/dashboard.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { LoginComponent } from './components/login/login.component';
import { UserrolesComponent } from './components/userroles/userroles.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    DashboardComponent,
    UserprofileComponent,
    LoginComponent,
    UserrolesComponent,
    LoginComponent,
    UserrolesComponent,
    UserprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ChartModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
    ModalDialogModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
