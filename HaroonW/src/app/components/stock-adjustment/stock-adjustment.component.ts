import { Component, OnInit } from '@angular/core';

//use in category combobox
export interface Category {
  cId: string;
  cName: string;
}

//use in items combobox
export interface Item {
  iId: string;
  iName: string;
}

@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.scss']
})
export class StockAdjustmentComponent implements OnInit {

//use in category combobox
cats: Category[] = [
  {cId: '1', cName: 'sss'},
  {cId: '2', cName: 'asdasd'},
  {cId: '3', cName: 'rettfd'}
]

//use in item combobox
items: Item[] = [
  {iId: '1', iName: 'abc'},
  {iId: '2', iName: 'def'},
  {iId: '3', iName: 'ghi'}
]

  constructor() { }

  ngOnInit() {
  }

}
