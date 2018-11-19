import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MatBottomSheet} from '@angular/material';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private bottomSheet: MatBottomSheet){

  }

  title = 'HaroonC';

  items: MenuItem[];

  //show bottom sheet
  showBottom(){
    this.bottomSheet.open(ErpBottomSheetComponent);
  }

}
