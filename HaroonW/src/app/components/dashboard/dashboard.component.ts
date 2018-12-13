import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Line_chart: Chart;

  constructor() { }

  ngOnInit() {
    this.LineChart_init();
  }

  LineChart_init() {
    
    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Trend'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'March', 'April', 'May',
        'June', 'July', 'Aug', 'Sept', 'Oct','Nov', 'Dec']
      },
      series: [{
        name: 'Purchases',
        data: [1, 2, 3, 4]
      },
      {
        name: 'Deliveries',
        data: [2, 4, 8, 6]
      },
      {
        name: 'Scrap',
        data: [3, 5, 7, 2]
      },
      {
        name: 'Returns',
        data: [6, 1, 2, 5]
      }]
    });
    this.Line_chart = chart;
  }
}
