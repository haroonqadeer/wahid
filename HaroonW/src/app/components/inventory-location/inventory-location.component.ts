import { Component, OnInit } from '@angular/core';

export interface Warehouse {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
}

@Component({
  selector: 'app-inventory-location',
  templateUrl: './inventory-location.component.html',
  styleUrls: ['./inventory-location.component.scss']
})
export class InventoryLocationComponent implements OnInit {

  warehouse: Warehouse[] = [
    {id: '1', name: 'G-10'},
    {id: '2', name: 'G-11'},
    {id: '3', name: 'G-6'}
  ];

  category: Category[] = [
    {id: '1', name: 'Sports'},
    {id: '2', name: 'Taxtile'},
    {id: '3', name: 'Hardware'}
  ];

  items: Item[] = [
    {id: '1', name: 'Football'},
    {id: '2', name: 'Shirt'},
    {id: '3', name: 'Paint'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
