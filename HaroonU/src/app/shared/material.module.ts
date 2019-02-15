import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

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
=======
import { MatFormFieldModule, MatRadioModule, MatBottomSheetModule, MatTabsModule, MatPaginatorModule, MatDialogModule, MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatSidenavModule, MatCardModule, MatMenuModule, MatExpansionModule } from '@angular/material';

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
>>>>>>> d588195283e2158cf30832ef0e552654d68e2925
})
export class MaterialModule { }
