import { Component, OnInit } from '@angular/core';

//use class in year combobox
export interface BYear{
  bName: string;
  code: string;
}

//use class in type combobox
export interface Type {
  tId: string;
  tName: string;
}

//use class in month combobox
export interface Month {
  mId: string;
  mName: string;
}

@Component({
  selector: 'app-balancesheet',
  templateUrl: './balancesheet.component.html',
  styleUrls: ['./balancesheet.component.scss']
})
export class BalancesheetComponent implements OnInit {
  
  years: BYear[];
  types: Type[];
  months: Month[];

  constructor() { 

    this.types = [
      {tName: 'abc', tId: '1'},
      {tName: 'def',tId: '2'},
      {tName: 'ghi', tId: '3'}
    ];
    this.years = [
      {bName: '2016', code: '2016'},
      {bName: '2017', code: '2017'},
      {bName: '2018', code: '2018'}
    ];
    this.months = [
      {mName: '1', mId: '1'},
      {mName: '2', mId: '2'},
      {mName: '3', mId: '3'}
    ];
  }

  ngOnInit() {
  }

}
