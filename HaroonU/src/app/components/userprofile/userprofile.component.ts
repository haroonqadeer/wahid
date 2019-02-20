import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var $: any;


//use in combobox
export interface Employee {
  eCNIC: string;
  eName: string;
  eDept: string;
  eParty: string;
}
//use in combobox
export interface Party {
  pValue: string;
  pName: string;
}
//use in combobox
export interface Role {
  rId: string;
  rName: string;
}
//Action Combo Box Value
export interface Action {
  actionId: string;
  actionName: string;
}
export interface Block {
  blockId: string;
  blockName: string;
}

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  // sorting() {
  //   $(document).read(function () {
  //     $('#myTable').DataTable();
  //   });
  // }

  // $(function() {
  //   $('#example').DataTable();
  // } );

  bounce: any;
  zoom: any;

  chart: Chart;
  eName = '';

  // public edited = false;
  // public edited1 = false;

  //Action Modal Window NgIF variables
  public actionPassRow = false;
  public actionPINCodeRow = false;
  public actionBlockRow = false;

  /// declaration
  query = '';
  resultsLength = '';
  userId = '';
  searchParty = '';
  searchEmployee = '';
  disabledPassword = '';
  disabledPIN = '';
  txtcnfrmPin = '';
  onSearchChange = '';
  showLink = false;

  //page ngModels
  UserId = 0;
  cmbEmployee = '';
  txtUsername = '';
  txtPassword = "";
  txtCnfrmPassword = "";
  cmbRole = "";
  txtPin = '';
  txtCnfrmPin = '';
  txtfrstName = '';
  txtlstName = '';
  // txtUName = '';
  txtvPassword = '';
  txtvCnfrmPassword = '';
  cmbvRole = '';
  cmbParty = '';
  txtContact = '';
  txtEmail = '';
  txtRemarks = '';
  txtdPassword = '';
  txtdPin = '';
  employeeId = 0;
  userName = '';
  rdbType = '';

  // Action Modal Window
  actionCmbValue = '';
  txtActPassword = '';
  txtActPIN = '';
  searchAction = '';
  searchBlock = '';
  blockCmbValue = '';

  //Action Combobox object
  actions: Action[] = [
    {
      actionId: '1',
      actionName: 'Delete'
    },
    {
      actionId: '2',
      actionName: 'Block'
    },
    {
      actionId: '3',
      actionName: 'Generate PIN'
    }
  ]
  // Block Action Combo Box
  blocks: Block[] = [
    {
      blockId: '1',
      blockName: '1 Hour'
    },
    {
      blockId: '2',
      blockName: '1 Day'
    },
    {
      blockId: '3',
      blockName: '1 Week'
    },
    {
      blockId: '4',
      blockName: '1 Month'
    },
    {
      blockId: '5',
      blockName: 'Manual'
    }
  ]

  //user table array
  public userDetail: Array<{
    userId: number,
    UserName: string,
    Email: string,
    Role: string,
    udate: string,
    loginDate: string,
    FirstName: string,
    LastName: string,
    vPassword: string,
    Contact: string
  }> = [];

  //Party Combobox object
  parties: Party[] = [
    {
      pValue: '1',
      pName: 'Employee'
    },
    {
      pValue: '2',
      pName: 'Visitor'
    }
  ]

  //Role Combobox object
  roles: Role[] = [
    {
      rId: '1',
      rName: 'Super Admin'
    },
    {
      rId: '2',
      rName: 'Admin'
    },
    {
      rId: '3',
      rName: 'Visitor'
    }
  ]

  //Employee Combobox object
  employees: Employee[] = [
    {
      eCNIC: '6110113445676',
      eName: 'Adnan',
      eDept: 'IT',
      eParty: 'Employee'
    },
    {
      eCNIC: '6110112455675',
      eName: 'Ahmed',
      eDept: 'Accounts',
      eParty: 'Visitor'
    },
    {
      eCNIC: '6110114356574',
      eName: 'Ali',
      eDept: 'Sales',
      eParty: 'Employee'
    },
    {
      eCNIC: '6110116367563',
      eName: 'Amir',
      eDept: 'IT',
      eParty: 'Visitor'
    },
    {
      eCNIC: '6110167345672',
      eName: 'Haroon',
      eDept: 'IT',
      eParty: 'Employee'
    }
  ];

  constructor(public toastr: ToastrManager) { }

  ngOnInit() {
    this.init();
    $(document).ready(function () {
      $('#dtBasicExample').DataTable();
      //$('.dataTables_length').addClass('bs-select');
    });
  }

  //get user management chart data
  init() {

    let chart = new Chart({
      chart: {
        type: 'area'
      },
      credits: {
        enabled: false
      },
      title: {
        text: ""
      },
      yAxis: {
        title: {
          text: 'User Management Trend'
        }
      },
      series: [{
        name: 'Updations',
        data: [300, 500, 250, 200, 800, 1000, 2000]
      }, {
        name: 'Banned',
        data: [250, 100, 300, 650, 450, 800, 600]
      }, {
        name: 'Additions',
        data: [1, 1, 1, 100, 500, 800, 450]
      }]
    });

    this.chart = chart;

  }

  // On Action Change Modal Window Combo Box
  onActionChange() {
    // When user selects "Delete" in the Combo Box
    if (this.actionCmbValue == '1') {
      this.actionBlockRow = false;
      this.actionPassRow = true;
      this.actionPINCodeRow = true;
      //Clear Text Boxes
      this.txtActPassword = '';
      this.txtActPIN = '';
    }
    // When user selects "Block" in the Combo Box
    else if (this.actionCmbValue == '2') {
      this.actionBlockRow = true;
      this.actionPassRow = true;
      this.actionPINCodeRow = true;
      //Clear Text Boxes
      this.blockCmbValue = '';
      this.txtActPassword = '';
      this.txtActPIN = '';
    }
    // When user selects "Generate PIN" in the Combo Box
    else if (this.actionCmbValue == '3') {
      this.actionBlockRow = false;
      this.actionPassRow = true;
      this.actionPINCodeRow = false;
      //Clear Text Boxes
      this.blockCmbValue = '';
      this.txtActPassword = '';
      this.txtActPIN = '';
    }
    else {
      return false;
    }
  }

  //On Block Change Modal Window
  // onBlockChange(event) {
  //   alert(event.);

  // onBlockChange() {
  //   // When user selects "1 Hour" in the Combo Box
  //   if (this.blockCmbValue == '1') {
  //     // this.actionBlockRow = false;
  //     this.actionPassRow = true;
  //     this.actionPINCodeRow = true;
  //   }
  //   // When user selects "1 Day" in the Combo Box
  //   else if (this.blockCmbValue == '2') {
  //     // this.actionBlockRow = true;
  //     this.actionPassRow = true;
  //     this.actionPINCodeRow = true;
  //   }
  //   // When user selects "1 Week" in the Combo Box
  //   else if (this.blockCmbValue == '3') {
  //     // this.actionBlockRow = false;
  //     this.actionPassRow = true;
  //     this.actionPINCodeRow = true;
  //   }
  //   // When user selects "1 Month" in the Combo Box
  //   else if (this.blockCmbValue == '4') {
  //     // this.actionBlockRow = false;
  //     this.actionPassRow = true;
  //     this.actionPINCodeRow = true;
  //   }
  //   // When user selects "Manual" in the Combo Box
  //   else if (this.blockCmbValue == '5') {
  //     // this.actionBlockRow = false;
  //     this.actionPassRow = true;
  //     this.actionPINCodeRow = true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  saveAction() {
    if (this.actionCmbValue == '') {
      this.toastr.errorToastr('Please Select Action Type', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.actionCmbValue != '') {
      if (this.blockCmbValue == '' && this.actionCmbValue == 'Block') {
        //this.isLoginError = true;
        this.toastr.errorToastr('Please Select Block Time', 'Error', { toastTimeout: (2500) });
        return false;
      }
      else if (this.txtActPassword.trim().length == 0) {
        //this.isLoginError = true;
        this.toastr.errorToastr('Please Enter Password', 'Error', { toastTimeout: (2500) });
        return false;
      }
      else if (this.txtActPIN.trim().length == 0) {
        this.toastr.errorToastr('Please Enter PIN Code', 'Error', { toastTimeout: (2500) });
        return false;
      }
      else {
        $('#actionModal').modal('hide');
        this.toastr.successToastr('Record Inserted Successfully', 'Success', { toastTimeout: (2500) });
        return false;
      }
    }
    else {
      return false;
    }
    // this.toastr.successToastr('Record Inserted Successfully', 'Success', { toastTimeout: (2500) });
    // return false;
  }

  //on Employee change model
  onEmployeeChange(item) {
    this.eName = this.employees.find(x => x.eName == item).eName.replace(/['"]+/g, '');
    this.showLink = true;
  }

  saveEmployee() {
    if (this.rdbType == '') {
      this.toastr.errorToastr('Please Select User Type', 'Error', { toastTimeout: (2500) }); return false;
    }
    else if (this.rdbType == 'employee' || this.rdbType == 'visitor') {
      if (this.cmbEmployee == '') {
        //this.isLoginError = true;
        this.toastr.errorToastr('Please Select User', 'Error', { toastTimeout: (2500) }); return false;
      }
      else if (this.txtUsername.trim().length == 0) {
        //this.isLoginError = true;
        this.toastr.errorToastr('Please Enter User Name', 'Error', { toastTimeout: (2500) }); return false;
      }
      else if (this.txtPassword.trim().length == 0) {
        this.toastr.errorToastr('Please Enter Password', 'Error', { toastTimeout: (2500) }); return false;
      }
      else if (this.txtPassword != this.txtCnfrmPassword) {
        this.toastr.errorToastr('Your password and confirmation password do not match.', 'Error', { toastTimeout: (2500) }); return false;
      }
      else {
        $('#userModal').modal('hide');
        this.toastr.successToastr('Record Inserted Successfully', 'Success', { toastTimeout: (2500) });
        return false;
      }
    }
    else {
      return false;
    }
  }

  close() {

  }

  //if you want to clear input
  clear() {

    this.UserId = 0;
    this.txtUsername = '';
    this.txtEmail = '';
    this.cmbParty = '';
    this.cmbvRole = '';
    this.txtRemarks = '';
    this.txtfrstName = '';
    this.txtlstName = '';
    this.txtvCnfrmPassword = '';
    this.txtvPassword = '';
    this.txtContact = '';

  }


  del(item) {

    this.userName = item.UserName;
    this.employeeId = item.userId;

  }

  edit(item) {
    this.UserId = item.userId;
    this.txtUsername = item.UserName;
    this.txtEmail = item.Email;
    this.cmbParty = item.loginDate;
    this.cmbvRole = item.Role;
    this.txtRemarks = item.udate;
    this.txtfrstName = item.FirstName;
    this.txtlstName = item.LastName;
    this.txtvPassword = item.vPassword;
    this.txtvCnfrmPassword = item.vPassword;
    this.txtContact = item.Contact;

    for (var i = 0; i < this.userDetail.length; i++) {
      if (this.userDetail[i]["userId"] == item.userId) {
        this.userDetail.splice(i, 1);
      }
    }
  }

  delete() {
    if (this.txtdPassword == '') {
      this.toastr.errorToastr('Please Enter Password', 'Error', { toastTimeout: (2500) }); return false;
    }
    else if (this.txtdPassword != '') {
      for (var i = 0; i < this.userDetail.length; i++) {
        if (this.userDetail[i]["userId"] == this.employeeId) {
          this.userDetail.splice(i, 1);
        }
      }
      this.clear();
      $("#dUserModal").modal('hide');
      this.toastr.successToastr('Record Deleted Successfully', 'Success', { toastTimeout: (2500) }); return false;
    }
    else {
      return false;
    }
  }
}

