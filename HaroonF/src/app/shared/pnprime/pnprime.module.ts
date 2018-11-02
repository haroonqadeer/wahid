import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TreeTableModule} from 'primeng/treetable';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MultiSelectModule} from 'primeng/multiselect';


@NgModule({
  imports: [
    CommonModule,
    OrganizationChartModule,
    ButtonModule,
    DialogModule,
    TreeTableModule,
    DropdownModule,
    ToastModule,
    MultiSelectModule
  ],
  exports: [
    OrganizationChartModule,
    ButtonModule,
    DialogModule,
    TreeTableModule,
    DropdownModule,
    ToastModule,
    MultiSelectModule
  ],
  declarations: []
})
export class PNPrimeModule { }
