import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AppComponent } from '../app.component';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var $: any;

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

  public finUser = false;

  public hrUser = false;

  panelOpenState = false;

  public userDetail;
  public empDetail;
  public cityDetail;
  public countryDetail;

  constructor(public toastr: ToastrManager, private appComponent: AppComponent) { }

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

    //checking if password is empty
    if (this.txtPassword.trim().length == 0) {

      this.toastr.errorToastr('Please Enter Password', 'Oops!', { toastTimeout: (2500) });
      return;
    } else if (this.txtPin.trim().length == 0) {

      this.toastr.errorToastr('Please Enter Pin', 'Oops!', { toastTimeout: (2500) });
      return;
    }

    this.toastr.successToastr('Message Send Successfully!', 'Success', { toastTimeout: (2500) });

    $('#reqAcceptModal').modal('hide');

    this.clear();

  }

  send() {

    this.toastr.successToastr('Message Send Successfully!', 'Success', { toastTimeout: (2500) });

    this.clear();

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

  clear() {

    this.txtPassword = "";
    this.txtPin = "";
    this.txtMessage = "";
    this.txtdPin = "";
    this.txtSubject = "";
  }
}


