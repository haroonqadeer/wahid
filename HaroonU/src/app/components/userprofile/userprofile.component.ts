import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  chart: Chart;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  public show:boolean = false;
  public buttonName:any = 'Show';

  constructor() { }

  ngOnInit() {
    this.init();
  }

   //add me function
   public add_me(){
    this.show = !this.show;

  }

  init(){

    let chart = new Chart({
      chart: {
        type: 'area'
      },
      credits: {
        enabled: false
      },
      title: {
        text: ""
      },
      yAxis: {
        title: {
            text: 'User Management Trend'
        }
      },
      series: [{
        name: 'Updations',
        data: [300, 500, 250, 200, 800, 1000, 2000]
    }, {
        name: 'Banned',
        data: [250, 100, 200, 350, 450, 800, 600]
    }, {
        name: 'Additions',
        data: [1, 1, 1, 100, 500, 800, 450]
    }]
    });
    
    this.chart = chart;

  }


}
