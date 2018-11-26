import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './components/area/area.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DmdashboardComponent } from './components/dmdashboard/dmdashboard.component';
import { DisasterAreaComponent } from './components/disaster-area/disaster-area.component';
import { DAreaWiseComponent } from './components/d-area-wise/d-area-wise.component';
import { HealthfacilitiesComponent } from './components/healthfacilities/healthfacilities.component';
import { EducationalInstitutesComponent } from './components/educational-institutes/educational-institutes.component';
import { InfrustructureComponent } from './components/infrustructure/infrustructure.component';
import { PopulationComponent } from './components/population/population.component';
import { DisasterAlertComponent } from './components/disaster-alert/disaster-alert.component';

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
  },
  {
    path: 'healthfacilities',
    component: HealthfacilitiesComponent
  },
  {
    path: 'eduinstitutes',
    component: EducationalInstitutesComponent
  },
  {
    path: 'infrastructure',
    component: InfrustructureComponent
  },
  {
    path: 'population',
    component: PopulationComponent
  },
  {
    path: 'disasterAlerts',
    component: DisasterAlertComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
