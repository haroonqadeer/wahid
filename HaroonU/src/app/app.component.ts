import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MatBottomSheet } from '@angular/material';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
// import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';

import { Event, Router, NavigationStart, NavigationEnd } from "@angular/router";

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private router: Router,
        private bottomSheet: MatBottomSheet,
        private userIdle: UserIdleService,
        private spinner: NgxSpinnerService) {

        // For Spinner Show and Hide 
        this.router.events.subscribe((routerEvent: Event) => {
            if (routerEvent instanceof NavigationStart) {
                //this.spinner.show();
                this.showSpinner();
                //this.showLoadingSpinner = true;
            }
            if (routerEvent instanceof NavigationEnd) {
                //this.showLoadingSpinner = false;
                // setTimeout(() => {
                //     /** spinner ends after 5 seconds */
                //     this.spinner.hide();
                // }, 1000);
                this.hideSpinner();
            }
        });
    }

    public hideDiv = false;
    public userName;

    title = 'HaroonU';
    items: MenuItem[];

    ngOnInit() {

        this.startWatching();


        // Start watching when user idle is starting.
        this.userIdle.onTimerStart().subscribe(
            count => this.Logout()
        );

        this.showDiv();

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

        if (localStorage.getItem('token') != null) {
            this.hideDiv = true;
            this.userName = localStorage.getItem('userName');
        }
        else {
            this.hideDiv = false;
        }
    }

    //show bottom sheet
    showBottom() {
        this.bottomSheet.open(ErpBottomSheetComponent);
    }

    //mehtod for logout user
    Logout() {
        this.stopWatching();
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        this.router.navigate(['']);
        this.showDiv();
    }

    getRandomColor() {
        var color = Math.floor(0x1000000 * Math.random()).toString(16);
        return '#' + ('000000' + color).slice(-6);
    }

    public printCSS() {

        var commonCss = ".commonCss{font-family: Arial, Helvetica, sans-serif; text-align: center; }";

        var cssHeading = ".cssHeading {font-size: 25px; font-weight: bold;}";
        var cssAddress = ".cssAddress {font-size: 16px; }";
        var cssContact = ".cssContact {font-size: 16px; }";

        var tableCss = "table {width: 100%; border-collapse: collapse;}    table thead tr th {text-align: left; font-family: Arial, Helvetica, sans-serif; font-weight: bole; border-bottom: 1px solid black; margin-left: -3px;}     table tbody tr td {font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #ccc; margin-left: -3px; height: 33px;}";

        var printCss = commonCss + cssHeading + cssAddress + cssContact + tableCss;

        return printCss;
    }


    //*Functions for Show & Hide Spinner
    showSpinner() {
        this.spinner.show();
    }


    hideSpinner() {
        setTimeout(() => {
            /** spinner ends after process done*/
            this.spinner.hide();
        }, 1000);
    }
}
