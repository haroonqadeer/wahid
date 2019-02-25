import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { ChartModule } from 'angular-highcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanydashboardComponent } from './components/companydashboard/companydashboard.component';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { CompanyComponent } from './components/company/company.component';
import { HeadquarterComponent } from './components/headquarter/headquarter.component';
import { BranchComponent } from './components/branch/branch.component';
import { DepartmentComponent } from './components/department/department.component';
import { SectionComponent } from './components/section/section.component';
import { SubsidiarieComponent } from './components/subsidiarie/subsidiarie.component';
import { CurrencyComponent } from './components/currency/currency.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    CompanydashboardComponent,
    ErpBottomSheetComponent,
    CompanyComponent,
    HeadquarterComponent,
    BranchComponent,
    DepartmentComponent,
    SectionComponent,
    SubsidiarieComponent,
    CurrencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartModule,
    ReactiveFormsModule,
    PNPrimeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ErpBottomSheetComponent],
})
export class AppModule { }
