import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule, MatRadioModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatStepperModule, MatIconModule, MatTabsModule, MatPaginatorModule, MatDialogModule,  MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatSidenavModule, MatCardModule, MatMenuModule, MatExpansionModule, MatButtonToggleModule } from '@angular/material';

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
    MatButtonToggleModule,
    MatRadioModule,
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
    MatButtonToggleModule,
    MatRadioModule,
    MatBottomSheetModule 
]
})
export class MaterialModule { }
