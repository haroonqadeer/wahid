import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './components/area/area.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DmdashboardComponent } from './components/dmdashboard/dmdashboard.component';
import { DisasterAreaComponent } from './components/disaster-area/disaster-area.component';
import { DAreaWiseComponent } from './components/d-area-wise/d-area-wise.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'area',
    component: AreaComponent
  },
  {
    path: 'dmDashboard',
    component: DmdashboardComponent
  },
  {
    path: 'entryPoint',
    component: DisasterAreaComponent
  },
  {
    path: 'areaWise',
    component: DAreaWiseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
