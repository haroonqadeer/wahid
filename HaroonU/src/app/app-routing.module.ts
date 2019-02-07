import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserrolesComponent } from './components/userroles/userroles.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

import { UserformComponent } from './components/userform/userform.component';
import { UserTreeComponent } from './components/user-tree/user-tree.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, {
    path: 'login',
    component: LoginComponent
  },
  {

    path: 'dashboard',
    component: DashboardComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'userroles',
    component: UserrolesComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'userprofile',
    component: UserprofileComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'userform',
    component: UserformComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'usertree',
    component: UserTreeComponent
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
