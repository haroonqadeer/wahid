import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionaireComponent } from './components/questionaire/questionaire.component';

import { AuditsComponent } from './components/audits/audits.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuditComponent } from './components/audit/audit.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },{
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'questionaire',
    component: QuestionaireComponent
  },
  {

    path: 'audits',
    component: AuditsComponent
  },
  {
    path: 'audit',
    component: AuditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
