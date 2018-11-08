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

const routes: Routes = [
  {
    path: '',
    component: FinancedashboardComponent
  },  
  {
    path:'coa',  
    component: ChartofaccountComponent
  },
  {
    path:'budget',  
    component: BudgetsComponent
  },
  {
    path:'taxSection',  
    component: TaxsectionComponent
  },
  {
    path:'payment',  
    component: PaymentvoucherComponent
  },
  {
    path:'receipt',  
    component: ReceiptvoucherComponent
  },
  {
    path:'adjustment',  
    component: AdjustmentvoucherComponent
  },
  {
    path:'ledger',  
    component: LedgerComponent
  },
  {
    path:'fixAsset',  
    component: FixassetComponent
  }     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
