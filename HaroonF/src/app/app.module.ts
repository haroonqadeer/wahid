import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { ChartModule } from 'angular-highcharts';
import {TreeTableModule} from "ng-treetable";
import {HttpModule} from '@angular/http';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartofaccountComponent } from './components/chartofaccount/chartofaccount.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { TaxsectionComponent } from './components/taxsection/taxsection.component';
import { FinancedashboardComponent } from './components/financedashboard/financedashboard.component';
import { PaymentvoucherComponent } from './components/paymentvoucher/paymentvoucher.component';
import { ReceiptvoucherComponent } from './components/receiptvoucher/receiptvoucher.component';
import { AdjustmentvoucherComponent } from './components/adjustmentvoucher/adjustmentvoucher.component';
import { LedgerComponent } from './components/ledger/ledger.component';
import { FixassetComponent } from './components/fixasset/fixasset.component';
import { BankaccountComponent } from './components/bankaccount/bankaccount.component';
import { ReconciliationComponent } from './components/reconciliation/reconciliation.component';
import { TrailbalanceComponent } from './components/trailbalance/trailbalance.component';
import { BalancesheetComponent } from './components/balancesheet/balancesheet.component';
import { IncomestatementComponent } from './components/incomestatement/incomestatement.component';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ChartofaccountComponent,
    BudgetsComponent,
    TaxsectionComponent,
    BankaccountComponent,
    TrailbalanceComponent,
    FixassetComponent,
    FinancedashboardComponent,
    PaymentvoucherComponent,
    ReceiptvoucherComponent,
    AdjustmentvoucherComponent,
    LedgerComponent,
    FixassetComponent,
    BankaccountComponent,
    ReconciliationComponent,
    BalancesheetComponent,
    IncomestatementComponent,
    ErpBottomSheetComponent
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
    TreeTableModule,
    HttpModule,
    NgCircleProgressModule.forRoot({
      
    })
  ],
  providers: [],
  bootstrap: [AppComponent],  
  entryComponents: [ErpBottomSheetComponent],  
})
export class AppModule { }
