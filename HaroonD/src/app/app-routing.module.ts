import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './components/area/area.component';
import { HealthfacilitiesComponent } from './components/healthfacilities/healthfacilities.component';
import { EducationalInstitutesComponent } from './components/educational-institutes/educational-institutes.component';
import { InfrustructureComponent } from './components/infrustructure/infrustructure.component';
import { PopulationComponent } from './components/population/population.component';

const routes: Routes = [
  {
    path: '',
    component: AreaComponent
  },
  {
    path: 'area',
    component: AreaComponent
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
    path: 'infrustructure',
    component: InfrustructureComponent
  },
  {
    path: 'population',
    component: PopulationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
