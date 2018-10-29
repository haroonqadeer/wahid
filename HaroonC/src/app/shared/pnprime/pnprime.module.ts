import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    OrganizationChartModule,
    ButtonModule,
    DialogModule
  ],
  exports: [
    OrganizationChartModule,
    ButtonModule,
    DialogModule
  ],
  declarations: []
})
export class PNPrimeModule { }
