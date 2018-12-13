import { Component, OnInit } from '@angular/core';

//use in Category combobox
export interface Category {
  cId: string;
  cName: string;
}

//use in Quotation Category combobox
export interface QuoCategory {
  cId: string;
  cName: string;
}

//use in Items combobox
export interface Item {
  iId: string;
  iName: string;
}

//use in Quotation items combobox
export interface QuoItem {
  iId: string;
  iName: string;
}

//use in Vendors combobox
export interface Vendor {
  vId: string;
  vName: string;
}

//use in Quotation vendor combobox
export interface QuoVendor {
  qId: string;
  qName: string;
}

@Component({
  selector: 'app-tender-request',
  templateUrl: './tender-request.component.html',
  styleUrls: ['./tender-request.component.scss']
})
export class TenderRequestComponent implements OnInit {

  //use in category combobox
  cats: Category[] = [
    {cId: '1', cName: 'Furniture & Fix'},
    {cId: '2', cName: 'Computer'},
    {cId: '3', cName: 'Office Equipment'}
  ];

  //use in Quotation category combobox
  itemCats: QuoCategory[] = [
    {cId: '1', cName: 'Furniture & Fix'},
    {cId: '2', cName: 'Computer'},
    {cId: '3', cName: 'Office Equipment'}
  ];

  //use in item combobox
  items: Item[] = [
    {iId: '1', iName: 'Laptop'},
    {iId: '2', iName: 'Chair'},
    {iId: '3', iName: 'Black Marker'}
  ];

  //use in quotation item combobox
  qItems: QuoItem[] = [
    {iId: '1', iName: 'Laptop'},
    {iId: '2', iName: 'Chair'},
    {iId: '3', iName: 'Black Marker'}
  ];

  //use in vendors combobox
  vendors: Vendor[] = [
    {vId: '1', vName: 'Ali'},
    {vId: '2', vName: 'Khan'},
    {vId: '3', vName: 'Farooqi'}
  ];

  //use in quotation vendors combobox
  qVendors: QuoVendor[] = [
    {qId: '1', qName: 'Ali'},
    {qId: '2', qName: 'Khan'},
    {qId: '3', qName: 'Farooqi'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
