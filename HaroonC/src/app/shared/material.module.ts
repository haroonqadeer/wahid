import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatStepperModule, MatIconModule, MatTabsModule, MatPaginatorModule, MatDialogModule,  MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatSidenavModule, MatCardModule, MatMenuModule, MatExpansionModule } from '@angular/material';

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
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule    
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
    MatMenuModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule ,
    MatStepperModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule    
]
})
export class MaterialModule { }
