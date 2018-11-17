import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollConComponent } from './components/payroll-con/payroll-con.component';
import { PayrollRulesComponent } from './components/payroll-rules/payroll-rules.component';
import { PayFixComponent } from './components/pay-fix/pay-fix.component';
import { PayrollDashboardComponent } from './components/payroll-dashboard/payroll-dashboard.component';
import { PayrollComponent } from './components/payroll/payroll.component';

const routes: Routes = [
  {
    path: '',
    component: PayrollDashboardComponent
  },
  {
    path: 'payroll',
    component: PayrollComponent
  },
  {
    path: 'payrollCon',
    component: PayrollConComponent
  },
  {
    path: 'payrollRule',
    component: PayrollRulesComponent
  },
  {
    path: 'payFixation',
    component: PayFixComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
