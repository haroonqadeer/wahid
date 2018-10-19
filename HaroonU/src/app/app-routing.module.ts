import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path:'home',
    component: DashboardComponent
  },
  {
    path:'userprofile',
    component: UserprofileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
