import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorRegistrationComponent } from './components/vendor-registration/vendor-registration.component';
import { VendorPanelComponent } from './components/vendor-panel/vendor-panel.component';
import { ItemsComponent } from './components/items/items.component';
import { RegistrationCriteriaComponent } from './components/registration-criteria/registration-criteria.component';
import { VendorsComponent } from './components/Vendors/Vendors.component';
import { TenderRequestComponent } from './components/tender-request/tender-request.component';
import { QuotationComponent } from './components/quotation/quotation.component';
import { TenderComponent } from './components/tender/tender.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'vendorRegister',
    component: VendorRegistrationComponent
  },
  {
    path: 'vendorPanel',
    component: VendorPanelComponent
  },
  {
    path: 'Items',
    component: ItemsComponent
  },
  {
    path: 'tenderRequest',
    component: TenderRequestComponent
  },
  {
    path: 'registration',
    component: RegistrationCriteriaComponent
  },
  {
    path: 'vendors',
    component: VendorsComponent
  },
  {
    path: 'quotation',
    component: QuotationComponent
  },
  {
    path: 'tender',
    component: TenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
