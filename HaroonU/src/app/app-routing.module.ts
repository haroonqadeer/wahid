import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserrolesComponent } from './components/userroles/userroles.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { CreatepasswordComponent } from './createpassword/createpassword.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },{
    path: 'login',
    component: LoginComponent
  },  
  {
    path:'dashboard',  
    component: DashboardComponent
  },
  {
    path: 'userroles',
    component: UserrolesComponent
  },
  {
    path:'userprofile',  
    component: UserprofileComponent
  },
  {
    path:'createpassword',  
    component: CreatepasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
