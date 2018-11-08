import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartofaccountComponent } from './components/chartofaccount/chartofaccount.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { TaxsectionComponent } from './components/taxsection/taxsection.component';
import { BankaccountComponent } from './components/bankaccount/bankaccount.component';
import { TrailbalanceComponent } from './components/trailbalance/trailbalance.component';

const routes: Routes = [
  {
    path: '',
    component: ChartofaccountComponent
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
    path:'bankAccount',  
    component: BankaccountComponent
  },
  {
    path: 'trailbalance',
    component: TrailbalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
