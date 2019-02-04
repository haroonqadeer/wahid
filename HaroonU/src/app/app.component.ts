import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MatBottomSheet} from '@angular/material';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private router : Router ,private bottomSheet: MatBottomSheet){

  }

  title = 'HaroonU';
  
  items: MenuItem[];

  //show bottom sheet
  showBottom(){
    this.bottomSheet.open(ErpBottomSheetComponent);
  }

  Logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['']);
  }
}
