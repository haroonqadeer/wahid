import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports:[
    
    MatInputModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
