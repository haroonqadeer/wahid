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
 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PayrollRulesComponent } from './components/payroll-rules/payroll-rules.component';
import { PayrollConComponent } from './components/payroll-con/payroll-con.component';
import { PayFixComponent } from './components/pay-fix/pay-fix.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { PayrollDashboardComponent } from './components/payroll-dashboard/payroll-dashboard.component';
import { HousehiringComponent } from './components/househiring/househiring.component';
import { HiringagreementComponent } from './components/hiringagreement/hiringagreement.component';
import { ApprovingauthorityComponent } from './components/approvingauthority/approvingauthority.component';
import { SanctionruleComponent } from './components/sanctionrule/sanctionrule.component';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { SanctionsComponent } from './components/sanctions/sanctions.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    PayrollRulesComponent,
    PayrollConComponent,
    PayFixComponent,
    PayrollComponent,
    PayrollDashboardComponent,
    HousehiringComponent,
    HiringagreementComponent,
    ApprovingauthorityComponent,
    SanctionruleComponent,
    ErpBottomSheetComponent,
    SanctionsComponent 
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
    NgCircleProgressModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ErpBottomSheetComponent], 
})
export class AppModule { }
