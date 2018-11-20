import { Component, OnInit } from '@angular/core';
 
//use in employee combobox
export interface Employee {
  eId: string;
  eName: string;
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
  
  //use in employee combobox
  employees: Employee[] = [
    {eId: '1', eName: 'Adnan'},
    {eId: '2', eName: 'Ahmed'},
    {eId: '3', eName: 'Ali'},
    {eId: '4', eName: 'Amir'}

  ];

  constructor() { }

  ngOnInit() {
  }

}
