import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from '../../app.component';

declare var $: any;
@Component({
  selector: 'app-headquarter',
  templateUrl: './headquarter.component.html',
  styleUrls: ['./headquarter.component.scss']
})

export class HeadquarterComponent implements OnInit {

  //Page Models
  officeId = 0;
  officeTitle = "";
  officeAddress = "";
  officeEmail = "";
  officePhone = "";
  officeMobile = "";
  officeWebsite = "";

  // NgModels For Searching Textboxes
  tblSearch = "";

  //Delete Modal Window Models
  userPassword = "";
  userPINCode = "";

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
    }
  ]

  constructor(public toastr: ToastrManager, private app: AppComponent) { }

  ngOnInit() {
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
      this.toastr.successToastr('Record Saved Successfully', 'Success', { toastTimeout: (2500) });
      $('#HQModal').modal('hide');
      return false;
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
      this.toastr.successToastr('Record Deleted Successfully', 'Success', { toastTimeout: (2500) });
      $('#deleteModal').modal('hide');
      return false;
    }
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

}
