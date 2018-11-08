import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-financedashboard',
  templateUrl: './financedashboard.component.html',
  styleUrls: ['./financedashboard.component.scss']
})
export class FinancedashboardComponent implements OnInit {
  Line_chart: Chart;
  Column_Chart: Chart;

  constructor() { }

  ngOnInit() {
    this.LineChart_init();
    this.ColumnChart_init();
  }

  LineChart_init() {
    
    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Cash at the end of month'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Cash at end of month',
        data: [4500, 3200, 1500, 3800, 3500, 4800, 5200, 5700, 5500, 7200, 7700, 8000]
      }]
    });
    this.Line_chart = chart;
  }

  ColumnChart_init(){
    let chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Income and Expenses'
      },
       xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Total Income',
        data: [5, 3, 4, 7, 2, 5, 3, 7, 9, 6, 1, 7]
      }, 
      {
          name: 'Total Expense',
          data: [-5, -3, -4, -7, -2, -5, -3, -7, -9, -6, -1, -7]
      },
      {
        type: 'spline',
        name: 'Net Profit',
        data: [2, 1, -2, 1, 3, 4, 2, -3, -1, 3, 4,-2]
      }]
    });
    this.Column_Chart = chart;
  }
}
