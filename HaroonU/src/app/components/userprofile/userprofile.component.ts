import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

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

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  bounce: any;
  zoom: any;

  chart: Chart;
  eName = '';

  public edited = false;
  public edited1 = false;

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

  //page ngModels
  UserId = 0;
  cmbPartyType: '';
  cmbEmployee: '';
  txtUsername: '';
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
  public userDetail: Array<{ userId: number, UserName: string, Email: string, Role: string, udate: string, loginDate: string, FirstName: string, LastName: string, vPassword: string, Contact: string }> = [];

  //use in combobox
  parties: Party[] = [
    { pValue: '1', pName: 'Employee' },
    { pValue: '2', pName: 'Visitor' }
  ]
  //use in combobox
  roles: Role[] = [
    { rId: '1', rName: 'Super Admin' },
    { rId: '2', rName: 'Admin' },
    { rId: '3', rName: 'Visitor' }
  ]
  //use in combobox
  employees: Employee[] = [
    { eCNIC: '6110113445676', eName: 'Adnan', eDept: 'IT', eParty: 'Employee' },
    { eCNIC: '6110112455675', eName: 'Ahmed', eDept: 'Accounts', eParty: 'Visitor' },
    { eCNIC: '6110114356574', eName: 'Ali', eDept: 'Sales', eParty: 'Employee' },
    { eCNIC: '6110116367563', eName: 'Amir', eDept: 'IT', eParty: 'Visitor' },
    { eCNIC: '6110167345672', eName: 'Haroon', eDept: 'IT', eParty: 'Employee' }
  ];

  constructor() { }

  ngOnInit() {
    this.init();
    //this.hidePara();
    // $('p').click(function(){
    //   $(this).hide();
    //   alert("Paragraph removed.");
    // });

    // $('div').click(function () {
    //   $(".hideDiv").hide();
    //   //alert("Paragraph removed.");
    // });
  }

  //use this data in chart
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

  //onchange Employee
  onEmployeeChange(item) {
    this.eName = this.employees.find(x => x.eCNIC == item).eName.replace(/['"]+/g, '');
  }

  saveEmp() {
    this.edited = true;

    //wait 3 Seconds and hide
    setTimeout(function () {
      this.edited = false;
      console.log(this.edited);
    }.bind(this), 2000);
  }

  close() {

  }
  saveVisitor() {
    //var date =new Date();
    if (this.UserId != 0) {
      this.userDetail.push({ userId: this.UserId, UserName: this.txtUsername, Email: this.txtEmail, Role: this.cmbvRole, udate: this.txtRemarks, loginDate: this.cmbParty, FirstName: this.txtfrstName, LastName: this.txtlstName, vPassword: this.txtvPassword, Contact: this.txtContact });


      this.edited = true;

      //wait 3 Seconds and hide
      setTimeout(function () {
        this.edited = false;
        console.log(this.edited);
      }.bind(this), 2000);

    } else {
      this.UserId = 1 + this.userDetail.length;
      this.userDetail.push({ userId: this.UserId, UserName: this.txtUsername, Email: this.txtEmail, Role: this.cmbvRole, udate: this.txtRemarks, loginDate: this.cmbParty, FirstName: this.txtfrstName, LastName: this.txtlstName, vPassword: this.txtvPassword, Contact: this.txtContact });

      this.edited = true;

      //wait 3 Seconds and hide
      setTimeout(function () {
        this.edited = false;
        console.log(this.edited);
      }.bind(this), 2000);
    }
    this.clear();
  }
  clear() {
    //if you want to clear input
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
    for (var i = 0; i < this.userDetail.length; i++) {
      if (this.userDetail[i]["userId"] == this.employeeId) {
        this.userDetail.splice(i, 1);
      }
    }
    this.clear();


    this.edited1 = true;

    //wait 3 Seconds and hide
    setTimeout(function () {
      this.edited1 = false;
      console.log(this.edited);
    }.bind(this), 2000);
  }

  animateIt(anim, obj) {
    $(obj).removeClass(anim + ' animated').addClass(anim + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(obj).removeClass(anim + ' animated');
    });
  }

  // hidePara() {
  //   $(".hideDiv").click(function () {
  //     $(".hideDiv").hide();
  //     //alert("Paragraph removed.");
  //   });
  // }
}

