import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    OrganizationChartModule,
    ButtonModule,
    DialogModule,
    ToastModule
  ],
  exports: [
    OrganizationChartModule,
    ButtonModule,
    DialogModule,
    ToastModule
  ],
  declarations: []
})
export class PNPrimeModule { }
