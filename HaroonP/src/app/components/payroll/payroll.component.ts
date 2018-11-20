import { Component, OnInit } from '@angular/core';

//use in employee combobox
export interface Employee {
  eId: string;
  eName: string;
}

//use in Allowance and deduction combobox
export interface Deduct {
  aId: string;
  aName: string;
}

//use in employee combobox
export interface Title {
  tId: string;
  tName: string;
}

//use in type combobox
export interface Type {
  tId: string;
  tName: string;
}

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {

  edited = false;
  edited1 = false;
  
  showAmount = false;
  showType = false;
  rdbAmount="";
  dtpDate = '';
  txtdPassword = '';
  txtdPin = '';

  selectedEmployee: Employee;
  selectedDed: Deduct;
  selectedTitle: Title;
  selectedType: Type;

  //use in employee combobox
  employees: Employee[] = [
    {eId: '1', eName: 'Adnan'},
    {eId: '2', eName: 'Ahmed'},
    {eId: '3', eName: 'Ali'},
    {eId: '4', eName: 'Amir'}

  ];

  //use in Allowance and deduction combobox
  deds: Deduct[] = [
    {aId: '1', aName: 'Allowance'},
    {aId: '2', aName: 'Deduction'}

  ];

  //use in title combobox
  titles: Title[] = [
    {tId: '1', tName: 'Adnan'},
    {tId: '2', tName: 'Ahmed'},
    {tId: '3', tName: 'Ali'},
    {tId: '4', tName: 'Amir'}

  ];

  //use in salaryType combobox
  salTypes: Type[] = [
    {tId: '1', tName: 'Contract'},
    {tId: '2', tName: 'Daily Wages'}

  ];

  constructor() { }

  ngOnInit() {
  }

  onButtonChange(item){
    if (item=="fix"){
      this.showType = false;
      this.showAmount = true;

    }else if(item=="%age"){
      this.showType = true;
      this.showAmount = false;
      
    }
  }
}
