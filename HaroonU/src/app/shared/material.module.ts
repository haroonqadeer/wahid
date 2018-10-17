import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: []
})
export class MaterialModule { }
