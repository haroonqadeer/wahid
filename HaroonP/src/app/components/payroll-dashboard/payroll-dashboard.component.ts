import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-payroll-dashboard',
  templateUrl: './payroll-dashboard.component.html',
  styleUrls: ['./payroll-dashboard.component.scss']
})
export class PayrollDashboardComponent implements OnInit {
  
  Pie_Chart: Chart;
  Line_chart: Chart;
  Column_Chart: Chart;
  Sal_Line_chart: Chart;

  constructor() { }

  ngOnInit() {
    this.LineChart_init();
    this.PieChart_init();
    this.ColumnChart_init();
    this.Sal_LineChart_init();
  }

  PieChart_init(){

    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Expense Break Down'
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
        name: 'Expense',
        data: [{
            name: 'Hiring',
            y: 128
        }, {
            name: 'Salary',
            y: 143
        }, {
            name: 'Overtime',
            y: 75
        }, {
            name: 'TA/DA',
            y: 26
        }, {
          name: 'medical',
          y: 226
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
        text: 'Number of Employees by Salary Range'
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
  
  ColumnChart_init(){
    let chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Payroll Pay to Employee'
      },
       xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Salary',
        data: [5, 3, 4, 7, 2, 5, 3, 7, 9, 6, 1, 7]
      }, 
      {
        type: 'spline',
        name: 'Net Profit',
        data: [2, 1, 5, 1, 3, 4, 2, 6, 4, 3, 4,2]
      }]
    });
    this.Column_Chart = chart;
  }

  Sal_LineChart_init() {
    
    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Over All Chart'
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
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3]
      },
      {
        name: 'Medical',
        data: [2, 4, 8, 6, 3, 1, 5, 7, 8, 9, 1, 6]
      },
      {
        name: 'Payroll',
        data: [3, 5, 7, 2, 7, 3, 1, 8, 2, 5, 9, 4 ]
      }]
    });
    chart.addPoint(4);
    this.Sal_Line_chart = chart;
  }
}
