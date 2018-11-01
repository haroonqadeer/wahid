import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { ChartModule } from 'angular-highcharts';
import {TreeTableModule} from "ng-treetable";
<<<<<<< HEAD
=======

>>>>>>> 344f93a885ac8a6ff46c299905fd704a03c34083

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartofaccountComponent } from './components/chartofaccount/chartofaccount.component';
import { BudgetsComponent } from './components/budgets/budgets.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ChartofaccountComponent,
    BudgetsComponent
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
    TreeTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
