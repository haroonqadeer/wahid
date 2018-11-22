import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollConComponent } from './components/payroll-con/payroll-con.component';
import { PayrollRulesComponent } from './components/payroll-rules/payroll-rules.component';
import { PayFixComponent } from './components/pay-fix/pay-fix.component';
import { PayrollDashboardComponent } from './components/payroll-dashboard/payroll-dashboard.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { ApprovingauthorityComponent } from './components/approvingauthority/approvingauthority.component';
import { HousehiringComponent } from './components/househiring/househiring.component';
import { HiringagreementComponent } from './components/hiringagreement/hiringagreement.component';
import { SanctionruleComponent } from './components/sanctionrule/sanctionrule.component';
import { SanctionsComponent } from './components/sanctions/sanctions.component';

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
  },
  {
    path: 'approvingAuthority',
    component: ApprovingauthorityComponent
  },
  {
    path: 'houseHiring',
    component: HousehiringComponent
  },
  {
    path: 'hiringAgreement',
    component: HiringagreementComponent
  },
  {
    path: 'sanctionRule',
    component: SanctionruleComponent
  },
  {
    path: 'sanction',
    component: SanctionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
