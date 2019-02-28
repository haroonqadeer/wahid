import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MatBottomSheet } from '@angular/material';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private bottomSheet: MatBottomSheet) { }


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
