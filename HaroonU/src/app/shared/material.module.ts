import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatRadioModule,
  MatBottomSheetModule,
  MatTabsModule,
  MatPaginatorModule,
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatCheckboxModule,
  MatSelectModule,
  MatButtonModule,
  MatSidenavModule,
  MatCardModule,
  MatMenuModule,
  MatExpansionModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCardModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCardModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatRadioModule
  ]
})
export class MaterialModule { }
