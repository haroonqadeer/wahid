import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Line_chart: Chart;
  Pie_Chart: Chart;

  // page ngModel
  txtPassword = '';
  txtPin = '';
  txtMessage = '';
  txtdPin = '';
  txtSubject = '';

  public edited = false;

  public acceptReq = false;

  public finUser = false;

  public hrUser = false;

  panelOpenState = false;

  public userDetail;
  public empDetail;
  public cityDetail;
  public countryDetail;


  //* variables for pagination and orderby pipe
  p = 1;
  order = 'info.name';
  reverse = false;
  sortedCollection: any[];
  itemPerPage = '10';

  // Data for users modal window table
  userModal = [
    {
      userId: 1,
      userName: "Arham",
      userFullName: "Arham Khan",
      userEmail: "arham@gmail.com",
      userRole: "Admin"
    },
    {
      userId: 2,
      userName: "Behram",
      userFullName: "Behram Khan",
      userEmail: "behram@gmail.com",
      userRole: "Visitor"
    },
    {
      userId: 3,
      userName: "Arsal",
      userFullName: "Arsal Khan",
      userEmail: "arsal@gmail.com",
      userRole: "Admin"
    }
  ]
  // Data for event log modal window table
  eventLog = [
    {
      eId: 1,
      eAction: "Addition",
      eActionDateTime: "15-Jan-2019 2:15pm"
    },
    {
      eId: 2,
      eAction: "Edition",
      eActionDateTime: "25-Jan-2019 3:15pm"
    },
    {
      eId: 3,
      eAction: "Deletion",
      eActionDateTime: "15-Feb-2019 4:15pm"
    }
  ]

  // Data for user roles modal window table
  userRoles = [
    {
      roleId: 1,
      roleTitle: "Financial User",
      rolePermission: "Financial (10), HR (2)"
    },
    {
      roleId: 2,
      roleTitle: "Admin HR",
      rolePermission: "User (10), HR (2)"
    },
    {
      roleId: 3,
      roleTitle: "Manager Procurement",
      rolePermission: "Procurement (10), HR (2)"
    }
  ]

  // Data for user request modal window table
  userRequest = [
    {
      rId: 1,
      rSender: "Arham",
      rUserName: "Behram"
    },
    {
      rId: 2,
      rSender: "Behram",
      rUserName: "Arham"
    },
    {
      rId: 3,
      rSender: "Arsal",
      rUserName: "Sarang"
    }
  ]

  // Data for role request modal window table
  roleRequest = [
    {
      rId: 1,
      rSender: "Behram",
      rRoleName: "Financial Role"
    },
    {
      rId: 2,
      rSender: "Arsal",
      rRoleName: "HR Role"
    },
    {
      rId: 3,
      rSender: "Sarang",
      rRoleName: "Payroll"
    }
  ]

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {

    this.appComponent.showDiv();
    this.LineChart_init();
    this.PieChart_init();

    // this.userService.getEmployee().subscribe(data =>{
    //   this.empDetail = data;
    // });

    // this.userService.getUser().subscribe(data =>{
    //   this.userDetail = data;
    // });

    // this.userService.getLocation().subscribe(data =>{
    //   this.cityDetail = data['m_Item1'];
    // });

    // this.userService.getLocation().subscribe(data =>{
    //   this.countryDetail = data['m_Item2'];
    // });
  }

  finUsr() {
    this.finUser = true;
    this.hrUser = false;
  }

  hrUsr() {
    this.finUser = false;
    this.hrUser = true;
  }

  acceptData() {

    this.edited = true;

    //wait 3 Seconds and hide
    setTimeout(function () {
      this.edited = false;
      console.log(this.edited);
    }.bind(this), 2000);
  }

  send() {

    this.edited = true;

    //wait 3 Seconds and hide
    setTimeout(function () {
      this.edited = false;
      console.log(this.edited);
    }.bind(this), 2000);
  }

  editFin() {
    this.finUser = true;
    this.hrUser = false;
  }

  editHr() {
    this.finUser = false;
    this.hrUser = true;
  }

  pie_data() {

    this.edited = true;

    //wait 3 Seconds and hide
    setTimeout(function () {
      this.edited = false;
      console.log(this.edited);
    }.bind(this), 2000);
  }

  PieChart_init() {

    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Users pie chart'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          showInLegend: true
        }
      },
      series: [{
        name: 'Users',
        data: [{
          name: 'Banned Users (8)',
          y: 8
        }, {
          name: 'Inactive Users (13)',
          y: 13
        }, {
          name: 'Web Users (15)',
          y: 15
        }, {
          name: 'Mobile Users (6)',
          y: 6
        }]
      }]
    });
    this.Pie_Chart = chart;
  }

  LineChart_init() {

    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'User trend for last week'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Line 1',
        data: [1, 2, 3]
      },
      {
        name: 'Line 2',
        data: [2, 4, 8, 6]
      },
      {
        name: 'Line 3',
        data: [3, 5, 7, 2]
      }]
    });
    chart.addPoint(4);
    this.Line_chart = chart;
  }


  //*function for sort table data 
  setOrder(value: string) {

    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}


