import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorRegistrationComponent } from './components/vendor-registration/vendor-registration.component';

const routes: Routes = [
  {
    path: '',
    component: VendorRegistrationComponent
  },
  {
    path: 'vendorRegister',
    component: VendorRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
