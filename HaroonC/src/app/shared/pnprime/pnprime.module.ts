import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    OrganizationChartModule,
    ButtonModule
  ],
  exports: [
    OrganizationChartModule,
    ButtonModule
  ],
  declarations: []
})
export class PNPrimeModule { }
