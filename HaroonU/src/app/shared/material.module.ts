import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { MatTabsModule, MatPaginatorModule, MatDialogModule,  MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatSidenavModule } from '@angular/material';
=======
import { MatTabsModule, MatPaginatorModule, MatDialogModule,  MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatCardModule } from '@angular/material';
>>>>>>> 5a9d8f343958075e996508fb218704302e154873


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
    MatSidenavModule
=======
    MatCardModule 
>>>>>>> 5a9d8f343958075e996508fb218704302e154873
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
    MatSidenavModule
=======
    MatCardModule 
>>>>>>> 5a9d8f343958075e996508fb218704302e154873
  ]
})
export class MaterialModule { }
