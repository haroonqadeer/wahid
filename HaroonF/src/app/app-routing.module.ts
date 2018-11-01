import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartofaccountComponent } from './components/chartofaccount/chartofaccount.component';
import { BudgetsComponent } from './components/budgets/budgets.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
