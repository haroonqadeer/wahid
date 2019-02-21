import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { TreeModule } from 'primeng/tree';

@NgModule({
  imports: [
    CommonModule,
    OrganizationChartModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    PasswordModule,
    TreeModule
  ],
  exports: [
    OrganizationChartModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    PasswordModule,
    TreeModule
  ],
  declarations: []
})
export class PNPrimeModule { }
