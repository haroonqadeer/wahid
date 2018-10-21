import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
<<<<<<< HEAD
import { LoginComponent } from './components/login/login.component';

=======
import { UserrolesComponent } from './components/userroles/userroles.component';
>>>>>>> 5a9d8f343958075e996508fb218704302e154873

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
<<<<<<< HEAD
    path:'dashboard',
=======
    path: 'home',
>>>>>>> 5a9d8f343958075e996508fb218704302e154873
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
