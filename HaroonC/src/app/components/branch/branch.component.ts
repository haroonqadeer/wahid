import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from '../../app.component';

import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  //Page Models
  branchId = 0;
  branchTitle = "";
  branchAddress = "";
  branchCity = "";
  branchEmail = "";
  branchPhone = "";
  branchMobile = "";
  branchWebsite = "";

  dbranchId = 0;

  //For Searching textboxes
  tblSearch = "";

  //City Modal Window Models
  cityName = "";

  //Delete Modal Window Models
  userPassword = "";
  userPINCode = "";

  //* variables for pagination and orderby pipe
  p = 1;
  order = 'info.name';
  reverse = false;
  sortedCollection: any[];
  itemPerPage = '10';

  branches = [
    {
      branId: 1,
      branTitle: "Infovative Solution",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 2,
      branTitle: "Infovative Solution",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 3,
      branTitle: "Infovative Solution",
      branAddress: "G-8 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 4,
      branTitle: "Alpha Solution",
      branAddress: "G-10 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 5,
      branTitle: "Infovative Solution",
      branAddress: "G-12 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 6,
      branTitle: "Infovative Solution",
      branAddress: "G-13 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 7,
      branTitle: "Infovative Solution",
      branAddress: "G-15 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 8,
      branTitle: "Infovative Tech",
      branAddress: "G-15 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 9,
      branTitle: "Infovative Hub",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 10,
      branTitle: "Infovative Solution",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 11,
      branTitle: "Infovative Solution",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 12,
      branTitle: "Infovative Solution",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 13,
      branTitle: "Infovative Solution",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 14,
      branTitle: "Infovative Solution",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 15,
      branTitle: "Infovative Solution",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branWebsite: "www.google.com"
    }
  ]

  //use in city combobox
  cities = [
    { ctyId: '1', ctyName: 'Islamabad' },
    { ctyId: '2', ctyName: 'Karachi' },
    { ctyId: '3', ctyName: 'Lahore' },
    { ctyId: '4', ctyName: 'Quetta' }
  ];

  constructor(public toastr: ToastrManager, private app: AppComponent, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  saveBranch() {
    if (this.branchTitle.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch Title', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchAddress.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch Address', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchCity.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch City', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchEmail.trim() == '') {
      this.toastr.errorToastr('Please enter email', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.isEmail(this.branchEmail.trim()) == false) {
      this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchPhone == "" || this.branchPhone.length < 10) {
      this.toastr.errorToastr('Please Enter Branch Phone', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchMobile == "" || this.branchMobile.length < 11) {
      this.toastr.errorToastr('Please Enter Branch Mobile', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchWebsite.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch Website', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.showSpinner();
      this.hideSpinner();
      this.toastr.successToastr('Record Saved Successfully', 'Success', { toastTimeout: (2500) });
      $('#branchModal').modal('hide');
      return false;
    }
  }

  delete() {
    if (this.userPassword.trim() == "") {
      this.toastr.errorToastr('Please Enter Password', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.userPINCode.trim() == "") {
      this.toastr.errorToastr('Please Enter PIN Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.showSpinner();
      this.hideSpinner();
      this.toastr.successToastr('Record Deleted Successfully', 'Success', { toastTimeout: (2500) });
      $('#deleteModal').modal('hide');
      return false;
    }
  }

  edit(item) {
    this.branchId = item.branId;
    this.branchTitle = item.branTitle;
    this.branchAddress = item.branAddress;
    this.branchCity = item.ctyId.toString();
    this.branchEmail = item.branEmail;
    this.branchPhone = item.branPhone;
    this.branchMobile = item.branMobile;
    this.branchWebsite = item.branWebsite;
  }

  saveCity() {

    ///////
    if (this.cityName.trim() == '') {
      this.toastr.errorToastr('Please enter city name', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {

      let data = this.cities.find(x => x.ctyName == this.cityName);

      if (data != undefined) {

        this.toastr.errorToastr('City name already exist', 'Error', { toastTimeout: (2500) });
        return false;
      }

      else {

        this.showSpinner();
        this.hideSpinner();

        this.toastr.successToastr('Saved successfully', 'Success', { toastTimeout: (2500) });

        this.cities.push({ ctyId: this.cities.length + "", ctyName: this.cityName });

        this.cityName = '';
        // $('#addCityModal').click();
        $('#cityModal').modal('hide');

        return false;
      }
    }
    ///////

    // if (this.cityName.trim() == "") {
    //   this.toastr.errorToastr('Please Enter City Name', 'Error', { toastTimeout: (2500) });
    //   return false;
    // }
    // else {
    //   this.showSpinner();
    //   this.hideSpinner();
    //   this.toastr.successToastr('Record Saved Successfully', 'Success', { toastTimeout: (2500) });
    //   $('#cityModal').modal('hide');
    //   return false;
    // }
  }


  //functions for delete currency
  deleteTemp(item) {

    this.dbranchId = item.branId;

  }

  clear() {
    this.branchId = 0;
    this.branchTitle = '';
    this.branchAddress = '';
    this.branchCity = '';
    this.branchEmail = '';
    this.branchPhone = '';
    this.branchMobile = '';
    this.branchWebsite = '';

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