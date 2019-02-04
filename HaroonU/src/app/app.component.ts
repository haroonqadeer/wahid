import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MatBottomSheet} from '@angular/material';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { Router } from '@angular/router';

import { UserService } from './shared/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  userName = '';


  hideDiv : boolean = false;
  
  constructor(private router : Router, private bottomSheet: MatBottomSheet, private userService : UserService){

  }

  showDiv() {

    if(localStorage.getItem('userToken')!=null){
      this.hideDiv = true;
      this.userName = localStorage.getItem('userName');
    }
    else{
      this.hideDiv = false;
    }
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
    this.showDiv();

  }
}
