import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanydashboardComponent } from './components/companydashboard/companydashboard.component';
import { CompanyprofileComponent } from './components/companyprofile/companyprofile.component';

const routes: Routes = [
  {
    path: '',
    component: CompanydashboardComponent
  },  
  {
    path:'companydashboard',  
    component: CompanydashboardComponent
  },
  {
    path:'companyprofile',  
    component: CompanyprofileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
