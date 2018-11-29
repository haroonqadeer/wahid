import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorRegistrationComponent } from './components/vendor-registration/vendor-registration.component';
import { VendorPanelComponent } from './components/vendor-panel/vendor-panel.component';
import { ItemsComponent } from './components/items/items.component';

const routes: Routes = [
  {
    path: '',
    component: VendorRegistrationComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
