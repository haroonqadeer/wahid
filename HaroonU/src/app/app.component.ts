import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MatBottomSheet} from '@angular/material';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {

   constructor(private router : Router, private bottomSheet: MatBottomSheet, private userIdle: UserIdleService){

   }

   public hideDiv = false;
   public userName;

   ngOnInit() {
      
      // Start watching when user idle is starting.
      this.userIdle.onTimerStart().subscribe(
         count => this.Logout()
      );
         
   }

   //user idle functions
   stop() {
      this.userIdle.stopTimer();
   }
   
   stopWatching() {
      this.userIdle.stopWatching();
   }

   startWatching() {
      this.userIdle.startWatching();
   }

   restart() {
      this.userIdle.resetTimer();
   }

   //method for show and hide manu bar with login and logout user
   showDiv() {

      if(localStorage.getItem('token')!=null){
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

   //mehtod for logout user
   Logout(){
      this.stopWatching();
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      this.router.navigate(['']);
      this.showDiv();
   }
}
