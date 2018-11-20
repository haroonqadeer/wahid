import { Component, OnInit } from '@angular/core';

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

//use in rules type combobox
export interface RuleType {
  rId: string;
  rName: string;
}

//use in salary type combobox
export interface SalType {
  sId: string;
  sName: string;
}

//use in saved date combobox
export interface SDate {
  mId: string;
  mName: string;
}

@Component({
  selector: 'app-payroll-rules',
  templateUrl: './payroll-rules.component.html',
  styleUrls: ['./payroll-rules.component.scss']
})
export class PayrollRulesComponent implements OnInit {

  edited = false;
  edited1 = false;
  
  cmbType: Deduct;
  cmbDate: SDate;
  cmbselect: Title;
  cmbRType: RuleType;
  cmbSType: SalType;

  //use in Allowance and deduction combobox
  types: Deduct[] = [
    {aId: '1', aName: 'Allowance'},
    {aId: '2', aName: 'Deduction'}

  ];

  //use in title combobox
  selects: Title[] = [
    {tId: '1', tName: 'Adnan'},
    {tId: '2', tName: 'Ahmed'},
    {tId: '3', tName: 'Ali'},
    {tId: '4', tName: 'Amir'}

  ];

  //use in salaryType combobox
  rTypes: RuleType[] = [
    {rId: '1', rName: 'abcdef'},
    {rId: '2', rName: 'aansdbf'}

  ];

  //use in salaryType combobox
  sTypes: SalType[] = [
    {sId: '1', sName: 'Contract'},
    {sId: '2', sName: 'Daily Wages'}

  ];

  //use in saved date combobox
  dates: SDate[] = [
    {mId: '1', mName: 'May 18, 2018'},
    {mId: '2', mName: 'June 24, 2018'},
    {mId: '3', mName: 'Aug 8, 2018'}

  ];

  constructor() { }

  ngOnInit() {
  }

}
