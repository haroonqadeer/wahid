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

import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StockAdjustmentComponent } from './components/stock-adjustment/stock-adjustment.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ReturnComponent } from './components/return/return.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { CarrierComponent } from './components/carrier/carrier.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ErpBottomSheetComponent,
    DashboardComponent,
    StockAdjustmentComponent,
    ReceiptComponent,
    ReturnComponent,
    DeliveryComponent,
    CarrierComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ErpBottomSheetComponent],
})
export class AppModule { }
