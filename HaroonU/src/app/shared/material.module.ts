import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule, MatTabsModule, MatPaginatorModule, MatDialogModule,  MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule } from '@angular/material';


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
    MatExpansionModule
  ],
  exports:[
    
    MatInputModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
