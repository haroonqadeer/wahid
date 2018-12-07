import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

//use in category combobox
export interface Category {
  cId: string;
  cName: string;
}

//use in city combobox
export interface City {
  cId: string;
  cName: string;
}

//use in carrier combobox
export interface Carrier {
  cId: string;
  cName: string;
}

//use in delivery combobox
export interface Delivery {
  dId: string;
  dName: string;
}

//use in document combobox
export interface Document {
  dId: string;
  dName: string;
}

//use in deliver to combobox
export interface Deliver {
  dId: string;
  dName: string;
}

//use in district combobox
export interface District {
  dId: string;
  dName: string;
}

//use in items combobox
export interface Item {
  iId: string;
  iName: string;
}

//use in area combobox
export interface Area {
  aId: string;
  aName: string;
}

//use in Type combobox
export interface Type {
  tId: string;
  tName: string;
}

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  showOwn = false;
  showRent = false;
  
  cmbType: Type;
  
  //use in category combobox
  cats: Category[] = [
    {cId: '1', cName: 'sss'},
    {cId: '2', cName: 'asdasd'},
    {cId: '3', cName: 'rettfd'}
  ]
    
  //use in cities combobox
  cities: City[] = [
    {cId: '1', cName: 'Islamabad'},
    {cId: '2', cName: 'Rawalpindi'},
    {cId: '3', cName: 'Lahore'},
    {cId: '4', cName: 'Karachi'},
    {cId: '5', cName: 'Peshawar'}
  ]
    
  //use in carrier combobox
  carriers: Carrier[] = [
    {cId: '1', cName: 'sss'},
    {cId: '2', cName: 'asdasd'},
    {cId: '3', cName: 'rettfd'}
  ]

  //use in delivery combobox
  deliveries: Delivery[] = [
    {dId: '1', dName: 'sss'},
    {dId: '2', dName: 'asdasd'},
    {dId: '3', dName: 'rettfd'}
  ]

  //use in deliver to combobox
  delivers: Deliver[] = [
    {dId: '1', dName: 'Rawalpindi'},
    {dId: '2', dName: 'Lahore'},
    {dId: '3', dName: 'Karachi'}
  ]

  //use in document combobox
  docs: Document[] = [
    {dId: '1', dName: 'sss'},
    {dId: '2', dName: 'asdasd'},
    {dId: '3', dName: 'rettfd'}
  ]

  //use in district combobox
  districts: District[] = [
    {dId: '1', dName: 'Punjab'},
    {dId: '2', dName: 'Sindh'},
    {dId: '3', dName: 'Islamabad Capital Territory'}
  ]

  //use in item combobox
  items: Item[] = [
    {iId: '1', iName: 'abc'},
    {iId: '2', iName: 'def'},
    {iId: '3', iName: 'ghi'}
  ]

  //use in type combobox
  types: Type[] = [
    {tId: '1', tName: 'Own'},
    {tId: '2', tName: 'Rental'}
  ]

  //use in area combobox
  areas: Area[] = [
    {aId: '1', aName: 'Saddar'},
    {aId: '2', aName: '6th Road'},
    {aId: '3', aName: 'G-10'}
  ]

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onTypeChange(item){
    
    if(item.tName=='Own'){
      this.showOwn = true;    
      this.showRent = false;    
    }else if(item.tName=='Rental'){
      this.showRent = true;
      this.showOwn = false;
    }else{
      this.showRent = false;
      this.showOwn = false;
    }
  }
}
