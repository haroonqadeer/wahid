import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendersComponent } from './components/calenders/calenders.component';

const routes: Routes = [
  {
    path: '',
    component: CalendersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
