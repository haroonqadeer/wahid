import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
// import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Line_chart: Chart;
  Pie_Chart: Chart;

  public edited = false;
  
  public acceptReq = false;

  public finUser = false;

  public hrUser = false;

  panelOpenState = false;
  
  constructor() { }

  ngOnInit() {
    this.LineChart_init();
    this.PieChart_init();
  }

  acceptData(){

    this.edited = true;
      
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }

  send(){

    this.edited = true;
      
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }

  editFin(){
    this.finUser = true;
    this.hrUser = false;
  }

  editHr(){
    this.finUser = false;
    this.hrUser = true;
  }

  pie_data(){

    this.edited = true;
      
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }

  PieChart_init(){

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
      }]
    });
    chart.addPoint(4);
    this.Line_chart = chart;
  }
}


