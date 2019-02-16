import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { OrderPipe } from 'ngx-order-pipe';

declare var $: any;


//For Populate Data in the Employee Table
export interface Employee {
  uId: string;
  uName: string;
  uEmail: string;
  uRole: string;
  uSince: string;
  lastLogin: string;
}

//For Selecting Number of Rows Display in the Table
export interface PageEntryValue {
  entryNumber: string;
}

@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.scss']
})
export class UserrolesComponent implements OnInit {

  order: string = "uId";
  reverse: boolean = false;
  //selectedEntry = "5";

  // public edited = false;
  // public edited1 = false;

  /// declaration
  employeeId = '';
  userName = '';
  txtdPassword = '';
  txtdPin = '';
  chkAdd = '';
  chkUpdate = '';
  chkDelete = '';
  chkView = '';
  panelOpenState = true;

  //Page Models
  query = '';
  pageEntryValue = '5';
  constructor(public toastr: ToastrManager) { }

  employees: Employee[] = [
    {
      uId: '1',
      uName: 'Aamir76',
      uEmail: 'Aamir',
      uRole: 'IT',
      uSince: 'Employee',
      lastLogin: '11'
    },
    {
      uId: '2',
      uName: 'Ali456676',
      uEmail: 'Ali',
      uRole: 'Finance',
      uSince: 'Employee',
      lastLogin: '13'
    },
    {
      uId: '3',
      uName: 'Waqas445776',
      uEmail: 'Waqas',
      uRole: 'HR',
      uSince: 'Visitor',
      lastLogin: '12'
    },
    {
      uId: '4',
      uName: 'Umair45676',
      uEmail: 'Umair',
      uRole: 'SCM',
      uSince: 'Employee',
      lastLogin: '15'
    },
    {
      uId: '5',
      uName: 'Touseeq5676',
      uEmail: 'Touseeq',
      uRole: 'IT',
      uSince: 'Employee',
      lastLogin: '16'
    },
    {
      uId: '6',
      uName: 'Ijaz45676',
      uEmail: 'Ijaz',
      uRole: 'Admin',
      uSince: 'Employee',
      lastLogin: '13'
    },
    {
      uId: '7',
      uName: 'Zain45676',
      uEmail: 'Zain',
      uRole: 'IT',
      uSince: 'Employee',
      lastLogin: '18'
    },
    {
      uId: '8',
      uName: 'Shahrukh45676',
      uEmail: 'Shahrukh',
      uRole: 'Admin',
      uSince: 'Visitor',
      lastLogin: '12'
    },
    {
      uId: '9',
      uName: 'Osama6176',
      uEmail: 'Osama',
      uRole: 'Operations',
      uSince: 'Employee',
      lastLogin: '3'
    },
    {
      uId: '10',
      uName: 'Bilal9445676',
      uEmail: 'Bilal',
      uRole: 'IT',
      uSince: 'Employee',
      lastLogin: '14'
    },
    {
      uId: '11',
      uName: 'Nabeel45676',
      uEmail: 'Nabeel',
      uRole: 'IT',
      uSince: 'Employee',
      lastLogin: '5'
    },
    {
      uId: '12',
      uName: 'Saad9676',
      uEmail: 'Saad',
      uRole: 'Procurement',
      uSince: 'Employee',
      lastLogin: '12'
    },
    {
      uId: '13',
      uName: 'Zohaib676',
      uEmail: 'Zohaib',
      uRole: 'Management',
      uSince: 'Contract',
      lastLogin: '14'
    },
    {
      uId: '14',
      uName: 'Zeeshan676',
      uEmail: 'Zeeshan',
      uRole: 'IT',
      uSince: 'Employee',
      lastLogin: '18'
    },
    {
      uId: '15',
      uName: 'Arslan676',
      uEmail: 'Arslan',
      uRole: 'IT',
      uSince: 'Permanent',
      lastLogin: '8'
    },
  ];

  entries: PageEntryValue[] = [
    { entryNumber: '5' },
    { entryNumber: '15' },
    { entryNumber: '50' },
    { entryNumber: '100' }
  ]


  ngOnInit() {
    // $(document).ready(function () {
    //   $('#example').DataTable();
    // });
  }

  // setOrder(value: string) {
  //   if (this.order === value) {
  //     this.reverse = !this.reverse;
  //   }
  //   this.order = value;
  // }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  delete() {
    this.toastr.successToastr('Record Deleted Successfully', 'Error', { toastTimeout: (2500) });
    return false;
  }

  save() {
    this.toastr.successToastr('Record Saved Successfully', 'Error', { toastTimeout: (2500) });
    return false;
  }

  edit() {
    this.toastr.successToastr('Record Edited Successfully', 'Error', { toastTimeout: (2500) });
    return false;
  }
}
