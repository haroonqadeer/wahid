import { Component, OnInit } from '@angular/core';
 
//use in employee combobox
export interface Employee {
  eId: string;
  eName: string;
}

//use in salary type combobox
export interface SType {
  sId: string;
  sName: string;
}

//use in rule type combobox
export interface RType {
  rId: string;
  rName: string;
}

@Component({
  selector: 'app-pay-fix',
  templateUrl: './pay-fix.component.html',
  styleUrls: ['./pay-fix.component.scss']
})
export class PayFixComponent implements OnInit {

  edited = false;
  edited1 = false;
  
  cmbEmployee = '';
  cmbSType = '';
  cmbRType = '';
  searchSType = '';
  searchRType = '';
  rName = '';
  sName = '';

  //use in employee combobox
  employees: Employee[] = [
    {eId: '1', eName: 'Adnan'},
    {eId: '2', eName: 'Ahmed'},
    {eId: '3', eName: 'Ali'},
    {eId: '4', eName: 'Amir'}

  ];

  //use in salary type combobox
  sTypes: SType[] = [
    {sId: '1', sName: 'Basic Pay'},
    {sId: '2', sName: 'Running Pay'}

  ];

  //use in rule type combobox
  rTypes: RType[] = [
    {rId: '1', rName: 'Fix'},
    {rId: '2', rName: '%age'}

  ];

  constructor() { }

  ngOnInit() {
  }

  //onchange Employee
  onRTypeChange(item){    
    this.rName = this.rTypes.find( x=> x.rId == item).rName.replace(/['"]+/g, '');    
  }  

  //onchange Employee
  onSTypeChange(item){    
    this.sName = this.sTypes.find( x=> x.sId == item).sName.replace(/['"]+/g, '');    
  }  

}
