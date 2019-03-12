import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MatBottomSheet } from '@angular/material';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';

import { Event, Router, NavigationStart, NavigationEnd } from "@angular/router";

import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // constructor(private bottomSheet: MatBottomSheet) { }

  constructor(private bottomSheet: MatBottomSheet, private router: Router, private spinner: NgxSpinnerService) {

    //this.spinner.show();

    // For Spinner Show and Hide 
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.spinner.show();
        //this.showLoadingSpinner = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        //this.showLoadingSpinner = false;
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 500);
      }
    });
  }

  public validateEmail(Email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(Email)) {
      return false;
    } else {
      return true;
    }
  }



  title = 'HaroonC';

  items: MenuItem[];

  //show bottom sheet
  showBottom() {
    this.bottomSheet.open(ErpBottomSheetComponent);
  }

}
