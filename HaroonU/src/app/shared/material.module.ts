import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

import { MatTabsModule, MatPaginatorModule, MatDialogModule,  MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatSidenavModule, MatCardModule, MatMenuModule } from '@angular/material';


=======
import { MatSidenavModule, MatCardModule, MatExpansionModule, MatTabsModule, MatPaginatorModule, MatDialogModule,  MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule } from '@angular/material';
>>>>>>> 849428e9610c39c19ca57bab16f417a27f25f5e1

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
    MatMenuModule,
=======
    MatExpansionModule,
>>>>>>> 849428e9610c39c19ca57bab16f417a27f25f5e1
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
<<<<<<< HEAD
    MatMenuModule,
=======
    MatExpansionModule,
>>>>>>> 849428e9610c39c19ca57bab16f417a27f25f5e1
    MatSidenavModule,
    MatCardModule 
]
})
export class MaterialModule { }
