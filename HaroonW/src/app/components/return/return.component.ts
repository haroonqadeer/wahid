import { Component, OnInit } from '@angular/core';

//use in category combobox
export interface Category {
  cId: string;
  cName: string;
}

//use in document combobox
export interface Document {
  dId: string;
  dName: string;
}

//use in items combobox
export interface Item {
  iId: string;
  iName: string;
}

//use in location combobox
export interface Location {
  lId: string;
  lName: string;
}

//use in return no combobox
export interface Return {
  rId: string;
  rName: string;
}

//use in vendor combobox
export interface Vendor {
  vId: string;
  vName: string;
}

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
  
  //use in category combobox
  cats: Category[] = [
    {cId: '1', cName: 'sss'},
    {cId: '2', cName: 'asdasd'},
    {cId: '3', cName: 'rettfd'}
  ]

  //use in document combobox
  docs: Document[] = [
    {dId: '1', dName: 'sss'},
    {dId: '2', dName: 'asdasd'},
    {dId: '3', dName: 'rettfd'}
  ]

  //use in item combobox
  items: Item[] = [
    {iId: '1', iName: 'abc'},
    {iId: '2', iName: 'def'},
    {iId: '3', iName: 'ghi'}
  ]

  //use in return combobox
  returns: Return[] = [
    {rId: '1', rName: 'abc'},
    {rId: '2', rName: 'def'},
    {rId: '3', rName: 'ghi'}
  ]

  //use in Inventory location combobox
  locs: Location[] = [
    {lId: '1', lName: 'Stock'},
    {lId: '2', lName: 'Returns'},
    {lId: '3', lName: 'Scrap'}
  ]

  //use in Vendor combobox
  vendors: Vendor[] = [
    {vId: '1', vName: 'Ali Khan'},
    {vId: '2', vName: 'Sadiq Qureshi'},
    {vId: '3', vName: 'Amir Ali'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
