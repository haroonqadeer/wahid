import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  latitude = 30.3753;
  longitude = 69.3451;
  
  Bar_Chart: Chart;
  Elem_Pie_Chart: Chart;
  High_Pie_Chart: Chart;
  Col_Pie_Chart: Chart;
  Uni_Pie_Chart: Chart;

  constructor() { }

  ngOnInit() {
    this.BarChart_init();
    this.Elem_PieChart_init();
    this.High_PieChart_init();
    this.Col_PieChart_init();
    this.Uni_PieChart_init();
  }

  BarChart_init(){
    let chart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Population'
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
      xAxis: {
        categories: ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29'],
        reversed: false
      },
      yAxis: {
        title: {
          text: null
        },
        labels: {
          formatter: function () {
            return Math.abs(this.value) + '%';
          }
        }
        //categories: ['60,000', '0', '0', '40,000']
      },
      series: [{
        name: 'Male',
        data: [40, 20, 41, 69, 23, 66]
      },
      {
        name: 'Female',
        data: [-20, -42, -54, -28, -32, -55]
      }]
    });
    this.Bar_Chart = chart;
  }
  
  Elem_PieChart_init(){

    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Elementary',
        align: 'center',
        verticalAlign: 'middle',
        y: 20
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            distance: -50,
            style: {
                fontWeight: 'bold',
                color: 'white'
            }
          },
          showInLegend: true,
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%',
          colors:['#FF9800','#5c5c61']
        }        
      },
      series: [{
        type: 'pie',
        name: 'Elementary',
        innerSize: '50%',
        data: [
            ['Male', 58.9],
            ['Female', 42.1]
        ]
    }]
    });
    this.Elem_Pie_Chart = chart;
  }
  
  High_PieChart_init(){

    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'HighSchool',
        align: 'center',
        verticalAlign: 'middle',
        y: 20
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            distance: -50,
            style: {
                fontWeight: 'bold',
                color: 'white'
            }
          },
          showInLegend: true,
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%',
          colors:['#00BCD4','#5c5c61']
        }        
      },
      series: [{
        type: 'pie',
        name: 'HighSchool',
        innerSize: '50%',
        data: [
            ['Male', 30],
            ['Female', 70]
        ]
    }]
    });
    this.High_Pie_Chart = chart;
  }
  
  Col_PieChart_init(){

    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'College',
        align: 'center',
        verticalAlign: 'middle',
        y: 20
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            distance: -50,
            style: {
                fontWeight: 'bold',
                color: 'white'
            }
          },
          showInLegend: true,
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%',
          colors:['#8BC34A','#5c5c61']
        }        
      },
      series: [{
        type: 'pie',
        name: 'College',
        innerSize: '50%',
        data: [
            ['Male', 38.2],
            ['Female', 62.8]
        ]
    }]
    });
    this.Col_Pie_Chart = chart;
  }
  
  Uni_PieChart_init(){

    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'University',
        align: 'center',
        verticalAlign: 'middle',
        y: 20
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            distance: -50,
            style: {
                fontWeight: 'bold',
                color: 'white'
            }
          },
          showInLegend: true,
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%',
          colors:['#DCDCDC','#5c5c61']
        }        
      },
      series: [{
        type: 'pie',
        name: 'University',
        innerSize: '50%',
        data: [
            ['Male', 41.9],
            ['Female', 58.1]
        ]
    }]
    });
    this.Uni_Pie_Chart = chart;
  }
}
