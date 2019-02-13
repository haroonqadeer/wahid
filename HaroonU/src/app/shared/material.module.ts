import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import {
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
=======
import { MatRadioModule, MatBottomSheetModule, MatTabsModule, MatPaginatorModule, MatDialogModule, MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatSidenavModule, MatCardModule, MatMenuModule, MatExpansionModule } from '@angular/material';
>>>>>>> 2157057d7e66680daca3a64cd5fe7ea1cf97602e

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
<<<<<<< HEAD
    MatFormFieldModule
=======
    MatRadioModule
>>>>>>> 2157057d7e66680daca3a64cd5fe7ea1cf97602e
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
<<<<<<< HEAD
    MatFormFieldModule
=======
    MatRadioModule
>>>>>>> 2157057d7e66680daca3a64cd5fe7ea1cf97602e
  ]
})
export class MaterialModule { }
