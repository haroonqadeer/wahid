import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from '../../app.component';

import { NgxSpinnerService } from 'ngx-spinner';
import { HttpHeaders, HttpClient } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-headquarter',
  templateUrl: './headquarter.component.html',
  styleUrls: ['./headquarter.component.scss']
})

export class HeadquarterComponent implements OnInit {

  serverUrl = "http://localhost:55536/";
  tokenKey = "token";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Page Models
  officeId = 0;
  officeTitle = "";
  officeAddress = "";
  officeEmail = "";
  officePhone = "";
  officeMobile = "";
  officeWebsite = "";

  dofficeId = 0;

  // NgModels For Searching Textboxes
  tblSearch = "";

  //Delete Modal Window Models
  userPassword = "";
  userPINCode = "";

  //* variables for pagination and orderby pipe
  p = 1;
  order = 'info.name';
  reverse = false;
  sortedCollection: any[];
  itemPerPage = '10';

  offices = [
    {
      offcId: 1,
      offcTitle: "Infovative Solution",
      offcAddress: "G-11 Markaz",
      offcEmail: "abc@gmail.com",
      offcPhone: "0512290450",
      offcMobile: "03331234567",
      offcWebsite: "www.google.com"
    },
    {
      offcId: 2,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 3,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 4,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 5,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 6,
      offcTitle: "Infovative Solution",
      offcAddress: "G-11 Markaz",
      offcEmail: "abc@gmail.com",
      offcPhone: "0512290450",
      offcMobile: "03331234567",
      offcWebsite: "www.google.com"
    },
    {
      offcId: 7,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 8,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 9,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 10,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 11,
      offcTitle: "Infovative Solution",
      offcAddress: "G-11 Markaz",
      offcEmail: "abc@gmail.com",
      offcPhone: "0512290450",
      offcMobile: "03331234567",
      offcWebsite: "www.google.com"
    },
    {
      offcId: 12,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 13,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 14,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 15,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    }
  ];

  constructor(public toastr: ToastrManager,
    private app: AppComponent,
    private spinner: NgxSpinnerService,
    private http: HttpClient) { }

  ngOnInit() {
  }

  //To get departments Data for display in main table
  getOffices() {
    return false;

    var Token = localStorage.getItem(this.tokenKey);

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });

    this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
      this.offices = data
    });
  }

  saveHQ() {
    if (this.officeTitle.trim() == "") {
      this.toastr.errorToastr('Please Enter Office Title', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.officeAddress.trim() == "") {
      this.toastr.errorToastr('Please Enter Office Address', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.officeEmail.trim() == '') {
      this.toastr.errorToastr('Please enter email', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.isEmail(this.officeEmail.trim()) == false) {
      this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.officePhone == "" || this.officePhone.length < 10) {
      this.toastr.errorToastr('Please Enter Office Phone', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.officeMobile == "" || this.officeMobile.length < 11) {
      this.toastr.errorToastr('Please Enter Office Mobile', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.officeWebsite.trim() == "") {
      this.toastr.errorToastr('Please Enter Office Website', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {

      if (this.officeId != null) {
        this.showSpinner();
        this.hideSpinner();
        this.toastr.successToastr('Updated Successfully', 'Success', { toastTimeout: (2500) });
        $('#HQModal').modal('hide');
        return false;
        var updateData = { "ID": this.officeId, Password: this.userPassword, PIN: this.userPINCode };

        var token = localStorage.getItem(this.tokenKey);

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        this.http.put(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

          if (data.msg != undefined) {
            this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
            return false;
          }
          else {
            this.toastr.successToastr('Record updated Successfully', 'Success!', { toastTimeout: (2500) });
            $('#HQModal').modal('hide');
            return false;
          }

        });
      }
      else {
        this.showSpinner();
        this.hideSpinner();
        this.toastr.successToastr('Record Save Successfully', 'Success', { toastTimeout: (2500) });
        $('#HQModal').modal('hide');
        return false;
        var saveData = { "Password": this.userPassword, "PIN": this.userPINCode };

        var token = localStorage.getItem(this.tokenKey);

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        this.http.post(this.serverUrl + 'api/pwCreate', saveData, { headers: reqHeader }).subscribe((data: any) => {

          if (data.msg != undefined) {
            this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
            return false;
          }
          else {
            this.toastr.successToastr('Record saved Successfully', 'Success!', { toastTimeout: (2500) });
            $('#HQModal').modal('hide');
            return false;
          }
        });
      }
      // this.showSpinner();
      // this.hideSpinner();
      // this.toastr.successToastr('Record Saved Successfully', 'Success', { toastTimeout: (2500) });
      // $('#HQModal').modal('hide');
      // return false;
    }
  }

  delete() {
    if (this.userPassword == "") {
      this.toastr.errorToastr('Please Enter Password', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.userPINCode == "") {
      this.toastr.errorToastr('Please Enter PIN Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.showSpinner();
      this.hideSpinner();
      this.toastr.successToastr('Record Deleted Successfully', 'Success', { toastTimeout: (2500) });
      $('#deleteModal').modal('hide');
      return false;
      return false;

      var data = { "ID": this.dofficeId, Password: this.userPassword, PIN: this.userPINCode };

      var token = localStorage.getItem(this.tokenKey);

      var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

      this.http.put(this.serverUrl + 'api/pwCreate', data, { headers: reqHeader }).subscribe((data: any) => {

        if (data.msg != undefined) {
          this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
          return false;
        }
        else {
          this.toastr.successToastr('Record Deleted Successfully', 'Success!', { toastTimeout: (2500) });
          $('#deleteModal').modal('hide');
          return false;
        }

      });
    }
  }

  //function for edit existing currency 
  edit(item) {

    this.officeId = item.offcId;
    this.officeTitle = item.offcTitle;
    this.officeAddress = item.offcAddress;
    this.officeEmail = item.offcEmail;
    this.officePhone = item.offcPhone;
    this.officeMobile = item.offcMobile;
    this.officeWebsite = item.offcWebsite;

  }

  //functions for delete currency
  deleteTemp(item) {

    this.dofficeId = item.offcId;

  }

  //For Clearing Form
  clear() {

    this.officeId = 0;
    this.officeTitle = '';
    this.officeAddress = '';
    this.officeEmail = '';
    this.officePhone = '';
    this.officeMobile = '';
    this.officeWebsite = '';

    this.userPassword = '';
    this.userPINCode = '';
  }

  isEmail(email) {
    return this.app.validateEmail(email);
  }
  //function for sort table data 
  setOrder(value: string) {

    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  // Functions for Show & Hide Spinner
  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    setTimeout(() => {
      /** spinner ends after process done*/
      this.spinner.hide();
    });
  }
}
