import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanydashboardComponent } from './components/companydashboard/companydashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CompanydashboardComponent
  },  
  {
    path:'companydashboard',  
    component: CompanydashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
