import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TreeTableModule} from 'primeng/treetable';
import {MultiSelectModule} from 'primeng/multiselect';


@NgModule({
  imports: [
    CommonModule,
    OrganizationChartModule,
    ButtonModule,
    DialogModule,
    TreeTableModule,
    MultiSelectModule
  ],
  exports: [
    OrganizationChartModule,
    ButtonModule,
    DialogModule,
    TreeTableModule,
    MultiSelectModule
  ],
  declarations: []
})
export class PNPrimeModule { }
