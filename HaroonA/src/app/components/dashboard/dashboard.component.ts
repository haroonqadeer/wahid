import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Status_Pie: Chart;
  Location_Pie: Chart;
  Department_Pie: Chart;
  Monthly_Column: Chart;

  constructor() { }

  ngOnInit() {
    this.StatusPieChart_init();
    this.LocationPieChart_init();
    this.DeptPieChart_init();
    this.MonthColumnChart_init();
  }

  StatusPieChart_init() {
    
    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Status'
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
        name: 'Status',
        data: [{
            name: 'Failed',
            y: 8
        }, {
            name: 'Pending',
            y: 10
        }, {
            name: 'Success',
            y: 20
        }]
      }]
    });
    this.Status_Pie = chart;
  }

  LocationPieChart_init() {
    
    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Location Wise'
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
        name: 'Location',
        data: [{
            name: 'Lahore',
            y: 8
        }, {
            name: 'Karachi',
            y: 13
        }, {
            name: 'Islamabad',
            y: 15
        }, {
            name: 'Multan',
            y: 6
        }]
      }]
    });
    this.Location_Pie = chart;
  }
  
  DeptPieChart_init() {
    
    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Department Wise'
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
        name: 'Department',
        data: [{
            name: 'Marketing',
            y: 8
        }, {
            name: 'Finance',
            y: 13
        }, {
            name: 'HR',
            y: 15
        }, {
            name: 'Procurement',
            y: 6
        }]
      }]
    });
    this.Department_Pie = chart;
  }
  
  MonthColumnChart_init() {
    
    let chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Monthly Activity'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Activity',
        data: [5, 15, 10, 20, 5, 10, 20, 5, 25, 15, 20, 10]
      }]
    });
    this.Monthly_Column = chart;
  }

}
