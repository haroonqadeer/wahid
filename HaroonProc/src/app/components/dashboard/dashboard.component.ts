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
        text: '5 Years Analysis'
      },
      xAxis: {
        categories: ['2011', '2012', '2013', '2014', '2015']
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Analysis',
        data: [4151, 5472, 3521, 14244, 7544]
      }]
    });
    this.Line_chart = chart;
  }
}
