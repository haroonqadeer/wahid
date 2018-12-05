import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StockAdjustmentComponent } from './components/stock-adjustment/stock-adjustment.component';
import { ReceiptComponent } from './components/receipt/receipt.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'stockAdjustment',
    component: StockAdjustmentComponent
  },
  {
    path: 'receipt',
    component: ReceiptComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
