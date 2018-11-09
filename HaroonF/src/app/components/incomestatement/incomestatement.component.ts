import { Component, OnInit } from '@angular/core';


//use in combobox Type
export interface IncomeExpenseType {
  idType: string;
  nameType: string;
}

//use in combobox Year
export interface IncomeExpenseYear {
  idYear: string;
  nameYear: string;
}

//use in combobox Month
export interface IncomeExpenseMonth { 
  idMonth: string;
  nameMonth: string;
}

@Component({
  selector: 'app-incomestatement',
  templateUrl: './incomestatement.component.html',
  styleUrls: ['./incomestatement.component.scss']
})


export class IncomestatementComponent implements OnInit {

  //page modals
  cmbFinancialType:IncomeExpenseType;
  cmbFinancialYear:IncomeExpenseYear;
  cmbFinancialMonth:IncomeExpenseMonth;

  finType: IncomeExpenseType[];
  finYear: IncomeExpenseYear[];
  finMonth: IncomeExpenseMonth[];

  constructor() {

    //use in combobox
    this.finType= [
      {nameType: 'New York', idType: 'NY'},
      {nameType: 'Rome', idType: 'RM'},
      {nameType: 'London', idType: 'LDN'},
      {nameType: 'Istanbul', idType: 'IST'},
      {nameType: 'Paris', idType: 'PRS'}
    ],
    //use in combobox
    this.finYear= [
      {nameYear: '2012', idYear: '12'},
      {nameYear: '2013', idYear: '13'},
      {nameYear: '2014', idYear: '14'},
      {nameYear: '2015', idYear: '15'},
      {nameYear: '2016', idYear: '16'}
    ],
    //use in combobox
    this.finMonth= [
      {nameMonth: 'January', idMonth: 'Jan'},
      {nameMonth: 'February', idMonth: 'Feb'},
      {nameMonth: 'March', idMonth: 'Mar'},
      {nameMonth: 'June', idMonth: 'Jun'},
      {nameMonth: 'July', idMonth: 'Jul'},
      {nameMonth: 'August', idMonth: 'Aug'},
      {nameMonth: 'September', idMonth: 'Sep'},
      {nameMonth: 'October', idMonth: 'Oct'},
      {nameMonth: 'November', idMonth: 'Nov'},
      {nameMonth: 'December', idMonth: 'Dec'}
    ]
   }

  ngOnInit() {
  }
  
}//export ends
