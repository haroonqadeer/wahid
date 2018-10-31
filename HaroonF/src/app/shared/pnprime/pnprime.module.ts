import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TreeTableModule} from 'primeng/treetable';


@NgModule({
  imports: [
    CommonModule,
    OrganizationChartModule,
    ButtonModule,
    DialogModule,
    TreeTableModule
  ],
  exports: [
    OrganizationChartModule,
    ButtonModule,
    DialogModule,
    TreeTableModule
  ],
  declarations: []
})
export class PNPrimeModule { }
