import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './components/area/area.component';
import { HealthfacilitiesComponent } from './components/healthfacilities/healthfacilities.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
