import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

import { LoginComponent } from './components/login/login.component';


import { UserrolesComponent } from './components/userroles/userroles.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {

    path:'dashboard',   

    component: DashboardComponent
  },
  {
    path: 'userprofile',
    component: UserprofileComponent
  },
  {
    path: 'userroles',
    component: UserrolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
