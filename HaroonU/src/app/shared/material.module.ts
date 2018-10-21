import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule, MatPaginatorModule, MatDialogModule,  MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatSidenavModule, MatCardModule } from '@angular/material';



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

    MatSidenavModule,

    MatCardModule 

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

    MatSidenavModule,

    MatCardModule 

  ]
})
export class MaterialModule { }
