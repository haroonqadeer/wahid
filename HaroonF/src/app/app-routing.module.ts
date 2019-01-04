import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartofaccountComponent } from './components/chartofaccount/chartofaccount.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { TaxsectionComponent } from './components/taxsection/taxsection.component';
import { FinancedashboardComponent } from './components/financedashboard/financedashboard.component';
import { PaymentvoucherComponent } from './components/paymentvoucher/paymentvoucher.component';
import { ReceiptvoucherComponent } from './components/receiptvoucher/receiptvoucher.component';
import { AdjustmentvoucherComponent } from './components/adjustmentvoucher/adjustmentvoucher.component';
import { LedgerComponent } from './components/ledger/ledger.component';
import { FixassetComponent } from './components/fixasset/fixasset.component';
import { BankaccountComponent } from './components/bankaccount/bankaccount.component';
import { ReconciliationComponent } from './components/reconciliation/reconciliation.component';
import { TrailbalanceComponent } from './components/trailbalance/trailbalance.component';
import { BalancesheetComponent } from './components/balancesheet/balancesheet.component';
import { IncomestatementComponent } from './components/incomestatement/incomestatement.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: FinancedashboardComponent,
    canActivate: [AuthGuard]
  },  
  {
    path:'coa',  
    component: ChartofaccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'budget',  
    component: BudgetsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'taxSection',  
    component: TaxsectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'payment',  
    component: PaymentvoucherComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'receipt',  
    component: ReceiptvoucherComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'adjustment',  
    component: AdjustmentvoucherComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'ledger',  
    component: LedgerComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'fixAsset',  
    component: FixassetComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'bankAccount',  
    component: BankaccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'bankRecon',  
    component: ReconciliationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trailbalance',
    component: TrailbalanceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'balanceSheet',
    component: BalancesheetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'incomeStatement',
    component: IncomestatementComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
