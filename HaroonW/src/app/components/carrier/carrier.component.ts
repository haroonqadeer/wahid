import { Component, OnInit } from '@angular/core';

//use in driver to combobox
export interface Driver {
  dId: string;
  dName: string;
}

//use in Type combobox
export interface Type {
  tId: string;
  tName: string;
}

//use in nature combobox
export interface Nature {
  nId: string;
  nName: string;
}

//use in capacity combobox
export interface Capacity {
  cId: string;
  cName: string;
}

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.scss']
})
export class CarrierComponent implements OnInit {
  
  //use in category combobox
  caps: Capacity[] = [
    {cId: '1', cName: 'sss'},
    {cId: '2', cName: 'asdasd'},
    {cId: '3', cName: 'rettfd'}
  ]

  //use in driver combobox
  drivers: Driver[] = [
    {dId: '1', dName: 'Ali'},
    {dId: '2', dName: 'Ahmed'},
    {dId: '3', dName: 'Farooq'}
  ]

  //use in type combobox
  types: Type[] = [
    {tId: '1', tName: 'asdasd'},
    {tId: '2', tName: 'dfdfgv'},
    {tId: '3', tName: 'rwerfd'}
  ]

  //use in nature combobox
  natures: Nature[] = [
    {nId: '1', nName: 'asdasd'},
    {nId: '2', nName: 'dfdfgv'},
    {nId: '3', nName: 'rwerfd'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
