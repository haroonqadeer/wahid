import { MaterialModule }from './shared/material.module'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ChartModule } from 'angular-highcharts';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ChartModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
