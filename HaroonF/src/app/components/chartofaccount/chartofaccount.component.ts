import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-chartofaccount',
  templateUrl: './chartofaccount.component.html',
  styleUrls: ['./chartofaccount.component.scss']
})
export class ChartofaccountComponent implements OnInit {

  cars: SelectItem[];

  selectedCars1: string[] = [];

  selectedCars2: string[] = [];


  constructor() {
    
    this.cars = [
      {label: 'Pkr', value: 'Pkr'},
      {label: 'Doller', value: 'Doller'},
  ];

   }

  ngOnInit() {    

    

  }

}
