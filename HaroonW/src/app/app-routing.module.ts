import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StockAdjustmentComponent } from './components/stock-adjustment/stock-adjustment.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ReturnComponent } from './components/return/return.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { CarrierComponent } from './components/carrier/carrier.component';
import { InventoryLocationComponent } from './components/inventory-location/inventory-location.component';
import { InventoryRegisterComponent } from './components/inventory-register/inventory-register.component';
import { ScrapComponent } from './components/scrap/scrap.component';
import { WareHouseComponent } from './components/ware-house/ware-house.component';

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
  },
  {
    path: 'return',
    component: ReturnComponent
  },
  {
    path: 'delivery',
    component: DeliveryComponent
  },
  {
    path: 'carrier',
    component: CarrierComponent
  },
  {
    path: 'inventoryLocation',
    component: InventoryLocationComponent
  },
  {
    path: 'inventoryRegister',
    component: InventoryRegisterComponent
  },
  {
    path: 'scrap',
    component: ScrapComponent
  },
  {
    path: 'warehouse',
    component: WareHouseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
