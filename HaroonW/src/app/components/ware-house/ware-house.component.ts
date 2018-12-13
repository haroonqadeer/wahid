import { Component, OnInit } from '@angular/core';

export interface Area {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}

@Component({
  selector: 'app-ware-house',
  templateUrl: './ware-house.component.html',
  styleUrls: ['./ware-house.component.scss']
})
export class WareHouseComponent implements OnInit {

  area: Area[] = [
    {id: '1', name: 'G-10'},
    {id: '2', name: 'G-11'},
    {id: '3', name: 'G-6'}
  ];

  cities: City[] = [
    {id: '1', name: 'Islamabad'},
    {id: '2', name: 'Lahore'},
    {id: '3', name: 'Karachi'},
    {id: '4', name: 'Peshawar'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
