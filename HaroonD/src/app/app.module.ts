import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { ChartModule } from 'angular-highcharts';
import {HttpModule} from '@angular/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreaComponent } from './components/area/area.component';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DmdashboardComponent } from './components/dmdashboard/dmdashboard.component';
import { DisasterAreaComponent } from './components/disaster-area/disaster-area.component';
import { DAreaWiseComponent } from './components/d-area-wise/d-area-wise.component';
import { HealthfacilitiesComponent } from './components/healthfacilities/healthfacilities.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ErpBottomSheetComponent,
    AreaComponent,
    DashboardComponent,
    DmdashboardComponent,
    DisasterAreaComponent,
    DAreaWiseComponent,
    HealthfacilitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartModule,
    ReactiveFormsModule,
    PNPrimeModule,
    HttpModule,
    NgCircleProgressModule.forRoot({}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApMV0SLs-Muha5rW1F1NudsS5i4YUqXQ0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ErpBottomSheetComponent],
})
export class AppModule { }
