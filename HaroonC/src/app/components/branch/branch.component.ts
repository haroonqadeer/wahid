import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

var $: any;
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

  //City Modal Window Models
  cityName = "";

  //Delete Modal Window Models
  userPassword = "";
  userPINCode = "";

  branches = [
    {
      branId: 1,
      branTitle: "Infovative Solution",
      branAddress: "G-11 Markaz",
      branCity: "Islamabad",
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

  constructor(public toastr: ToastrManager) { }

  ngOnInit() {
  }
  saveBranch() {
    if (this.branchTitle == "") {
      this.toastr.errorToastr('Please Enter Branch Title', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchAddress == "") {
      this.toastr.errorToastr('Please Enter Branch Address', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchCity == "") {
      this.toastr.errorToastr('Please Enter Branch City', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchEmail == "") {
      this.toastr.errorToastr('Please Enter Branch Email', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchPhone == "") {
      this.toastr.errorToastr('Please Enter Branch Phone', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchMobile == "") {
      this.toastr.errorToastr('Please Enter Branch Mobile', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchWebsite == "") {
      this.toastr.errorToastr('Please Enter Branch Website', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.toastr.successToastr('Record Saved Successfully', 'Success', { toastTimeout: (2500) });
      $('#branchModal').Modal('hide');
      return false;
    }
  }

  saveCity() {
    if (this.cityName == "") {
      this.toastr.errorToastr('Please Enter City Name', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.toastr.successToastr('Record Saved Successfully', 'Success', { toastTimeout: (2500) });
      $('#cityModal').Modal('hide');
      return false;
    }
  }

  delete() {
    if (this.userPassword = "") {
      this.toastr.errorToastr('Please Enter Password', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.userPINCode = "") {
      this.toastr.errorToastr('Please Enter PIN Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.toastr.successToastr('Record Deleted Successfully', 'Success', { toastTimeout: (2500) });
      $('#deleteModal').Modal('hide');
      return false;
    }
  }
}
