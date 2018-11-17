import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-hrdashboard',
  templateUrl: './hrdashboard.component.html',
  styleUrls: ['./hrdashboard.component.scss']
})
export class HRDashboardComponent implements OnInit {

  Column_Chart: Chart;
  Leave_Column_Chart: Chart;
  Off_Column_Chart: Chart;
  Dept_Column_Chart: Chart;
  Type_Bar_Chart: Chart;
  Gender_Bar_Chart: Chart;
  Vacancy_Bar_Chart: Chart;
  
  constructor() { }

  ngOnInit() {
    this.ColumnChart_init();
    this.LeaveColumnChart_init();
    this.OffColumnChart_init();
    this.DeptColumnChart_init();
    this.TypeBarChart_init();
    this.GenderBarChart_init();
    this.VacBarChart_init();
  }

  ColumnChart_init(){
    let chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Active Employee'
      },
       xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Employees',
        data: [5, 3, 4, 7, 2, 5, 3, 7, 9, 6, 1, 7]
      }]
    });
    this.Column_Chart = chart;
  }

  LeaveColumnChart_init(){
    let chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Hiring/Leaving'
      },
       xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Hiring',
        data: [5, 3, 4, 7, 2, 5, 3, 7, 9, 6, 1, 7]
      },
      {
        name: 'Leaving',
        data: [4, 6, 9, 2, 1, 8, 6, 3, 7, 4, 5, 5]
      }]
    });
    this.Leave_Column_Chart = chart;
  }
  
  OffColumnChart_init(){
    let chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Offices'
      },
       xAxis: {
        categories: ['HQ', 'Lahore', 'Karachi']
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Quantity',
        data: [14, 12, 18]
      }]
    });
    this.Off_Column_Chart = chart;
  }

  DeptColumnChart_init(){
    let chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Department'
      },
       xAxis: {
        categories: ['IT', 'Finance', 'Admin']
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Quantity',
        data: [20, 12, 8]
      }]
    });
    this.Dept_Column_Chart = chart;
  }
  
  TypeBarChart_init(){
    let chart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Type'
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Permanent',
        data: [40]
      },
      {
        name: 'Contract',
        data: [-8]
      }]
    });
    this.Type_Bar_Chart = chart;
  }
  
  GenderBarChart_init(){
    let chart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Gender'
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Male',
        data: [30]
      },
      {
        name: 'Female',
        data: [-18]
      }]
    });
    this.Gender_Bar_Chart = chart;
  }
  
  VacBarChart_init(){
    let chart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Vacancy'
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Filled',
        data: [20]
      },
      {
        name: 'Vacancy',
        data: [-8]
      }]
    });
    this.Vacancy_Bar_Chart = chart;
  }
}
