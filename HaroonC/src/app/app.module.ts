import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { ChartModule } from 'angular-highcharts';
import { OrgChartModule } from 'ng2-org-chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanydashboardComponent } from './components/companydashboard/companydashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    CompanydashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartModule,
    OrgChartModule,
    ReactiveFormsModule,
    PNPrimeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
