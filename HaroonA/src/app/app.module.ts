import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import {HttpModule} from '@angular/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ChartModule } from 'angular-highcharts';

import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionaireComponent } from './components/questionaire/questionaire.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuditComponent } from './components/audit/audit.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ErpBottomSheetComponent,
    QuestionaireComponent,
    DashboardComponent,
    AuditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PNPrimeModule,
    HttpModule,
    NgCircleProgressModule.forRoot({}),
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ErpBottomSheetComponent],
})
export class AppModule { }
