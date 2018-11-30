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
import { VendorRegistrationComponent } from './components/vendor-registration/vendor-registration.component';
import { VendorPanelComponent } from './components/vendor-panel/vendor-panel.component';
import { ItemsComponent } from './components/items/items.component';
import { VendorsComponent } from './components/Vendors/Vendors.component';
import { RegistrationCriteriaComponent } from './components/registration-criteria/registration-criteria.component';
import { TenderRequestComponent } from './components/tender-request/tender-request.component';
import { QuotationComponent } from './components/quotation/quotation.component';
import { TenderComponent } from './components/tender/tender.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ErpBottomSheetComponent,
    VendorRegistrationComponent,
    VendorPanelComponent,
    ItemsComponent,
    VendorsComponent,
    RegistrationCriteriaComponent,
    TenderRequestComponent,
    QuotationComponent,
    TenderComponent,
    DashboardComponent
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
