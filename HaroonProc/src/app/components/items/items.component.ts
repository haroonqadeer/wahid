import { Component, OnInit } from '@angular/core';

//use in Category combobox
export interface Category {
  cId: string;
  cName: string;
}

//use in Types combobox
export interface Type {
  tId: string;
  tName: string;
}

//use in Tax combobox
export interface Tax {
  tId: string;
  tName: string;
}

//use in packing types combobox
export interface pType {
  bId: string;
  bName: string;
}

//use in groups combobox
export interface Group {
  gId: string;
  gName: string;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  //use in category combobox
  cats: Category[] = [
    {cId: '1', cName: 'Furniture & Fix'},
    {cId: '2', cName: 'Computer'},
    {cId: '3', cName: 'OfficeEquipment'}
  ];

  //use in type combobox
  types: Type[] = [
    {tId: '1', tName: 'Consumable Items'},
    {tId: '2', tName: 'Stockable Items'}
  ];

  //use in tax combobox
  taxes: Tax[] = [
    {tId: '1', tName: 'Individual'},
    {tId: '2', tName: 'AOP'},
    {tId: '3', tName: 'Firm'},
    {tId: '4', tName: 'Company'}

  ];

  //use in packing type combobox
  bTypes: pType[] = [
    {bId: '1', bName: 'Cotton'},
    {bId: '2', bName: 'Box'},
    {bId: '3', bName: 'Open'}

  ];

  //use in group combobox
  groups: Group[] = [
    {gId: '1', gName: 'Electronics'},
    {gId: '2', gName: 'Furniture'},
    {gId: '3', gName: 'Computer'},
    {gId: '4', gName: 'Medicine'}

  ];

  constructor() { }

  ngOnInit() {
  }

}
