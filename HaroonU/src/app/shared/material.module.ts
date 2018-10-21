import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { MatExpansionModule, MatTabsModule, MatPaginatorModule, MatDialogModule,  MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule } from '@angular/material';
=======

import { MatTabsModule, MatPaginatorModule, MatDialogModule,  MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatSidenavModule, MatCardModule } from '@angular/material';

>>>>>>> 4d3dc4b51994c1e0cc7b866e350831215203523d


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
<<<<<<< HEAD
    MatExpansionModule
=======

    MatSidenavModule,

    MatCardModule 

>>>>>>> 4d3dc4b51994c1e0cc7b866e350831215203523d
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
<<<<<<< HEAD
    MatExpansionModule
=======

    MatSidenavModule,

    MatCardModule 

>>>>>>> 4d3dc4b51994c1e0cc7b866e350831215203523d
  ]
})
export class MaterialModule { }
