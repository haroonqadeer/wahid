import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Event, Router, NavigationStart, NavigationEnd } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // serverUrl = "http://localhost:3004/";
  serverUrl = "http://192.168.200.19:9010/";

  public branchList = [];
  public locationId;
  public cmpnyId;
  public empId;
  public cmpnyName;
  public empfirstName;
  public empFullName;
  public empEmail;

  logedInUserName = '';

  constructor(private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router) {

  }


  public hideDiv = false;
  title = 'HaroonO';
  lblUserName = "";
  items: MenuItem[];

  //show bottom sheet
  showBottom() {
    //this.bottomSheet.open(ErpBottomSheetComponent);
  }

  ngOnInit() {

    this.checkLogin("No");

    // this.showDiv();
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { separator: true },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              { label: 'Save', icon: 'pi pi-fw pi-save' },
              { label: 'Update', icon: 'pi pi-fw pi-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              { label: 'Delete', icon: 'pi pi-fw pi-minus' }
            ]
          }
        ]
      },
      { separator: true },
      {
        label: 'Quit', icon: 'pi pi-fw pi-times'
      }
    ];
  }
  //*function for checking login already logedin or not 
  checkLogin(loginChk) {

    if (localStorage.getItem('userName') != null) {

      this.logedInUserName = localStorage.getItem('userName');
      this.showDiv();
      this.getUserDetail(this.logedInUserName);

      if (loginChk == "Yes") {
        this.router.navigate(['onlineJobProfile']);
      }


      if (this.cmpnyId == undefined) {

        var UserName = localStorage.getItem('userName');
        // this.getUserDetail(UserName);

      }

    } else {
      this.router.navigate(['']);
    }

  }
  getUserDetail(name) {

    var loginData = { IndvdlERPUsrID: name };

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.serverUrl + 'api/getUserDetail', loginData, { headers: reqHeader }).subscribe((data: any) => {

      // alert(data.userDetail[0].indvdlID); return
      localStorage.setItem('empID', data.userDetail[0].indvdlID)
      // localStorage.setItem('cmpnyID', data[0].cmpnyID);
      // localStorage.setItem('locationCd', data[0].locationCd);

      this.cmpnyId = data.userDetail[0].cmpnyID;
      this.cmpnyName = data.userDetail[0].locationName;
      this.locationId = data.userDetail[0].locationCd;
      this.empId = data.userDetail[0].indvdlID;
      this.empfirstName = data.userDetail[0].firstName;
      this.empFullName = data.userDetail[0].fullName;
      this.empEmail = data.userDetail[0].email;

      for (var i = 0; i < data.userDetail.length; i++) {
        this.branchList.push({
          label: data.userDetail[i].locationName,
          value: data.userDetail[i].locationCd
        });
      }
      this.lblUserName = data.userDetail[0].firstName;

      this.chkApplcntQual(data.userDetail[0].indvdlID);
    });

  }

  chkApplcntQual(item) {

    //var Token = localStorage.getItem(this.tokenKey);

    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get(this.serverUrl + 'api/getchkApplcntQual?applicantID=' + item, { headers: reqHeader }).subscribe((data: any) => {

      // this.employeeListMain = data;
      if (data.length > 0) {

        localStorage.removeItem('rn');
        localStorage.removeItem('jobPostVcncyID');
        localStorage.removeItem('vcncyID');
        localStorage.removeItem('jobDesigID');
        localStorage.removeItem('jobDesigName');

        localStorage.setItem('jobPostVcncyID', data[0].jobPostVcncyID);
        localStorage.setItem('vcncyID', data[0].vcncyID);
        localStorage.setItem('jobPostDeptCd', data[0].jobPostDeptCd);
        localStorage.setItem('jobPostLocationCd', data[0].jobPostLocationCd);
        localStorage.setItem('jobDesigID', data[0].jobDesigID);
        localStorage.setItem('jobDesigName', data[0].jobDesigName);

        this.getRandomNumber(localStorage.getItem('jobPostVcncyID'));
      }
    });

  }

  getRandomNumber(item) {

    //var Token = localStorage.getItem(this.tokenKey);

    // this.app.showSpinner();

    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get('http://192.168.200.19:9033/api/getRandomNo?jobPostVcncyID=' + item, { headers: reqHeader }).subscribe((data: any) => {

      localStorage.setItem('rn', data[0].rn);

      // this.app.hideSpinner();
    });

  }

  //method for show and hide manu bar with login and logout user
  showDiv() {
    this.hideDiv = true;
    // this.lblUserName = this.empfirstName;
    // if (localStorage.getItem('token') != null) {
    //   this.hideDiv = true;
    //   this.lblUserName = localStorage.getItem('userName');
    // }
    // else {
    //   this.hideDiv = false;
    // }
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

  //mehtod for logout user
  Logout() {
    //this.stopWatching();
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('jobPostVcncyID');
    localStorage.removeItem('vcncyID');
    localStorage.removeItem('jobDesigID');
    localStorage.removeItem('jobDesigName');

    this.router.navigate(['login']);

    this.hideDiv = false;
    // this.showDiv();
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



  /* Set the width of the side navigation to 250px */
  public openNav() {
    document.getElementById("mySidenav").style.width = "248px";
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
}
