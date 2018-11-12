import { Component, OnInit } from '@angular/core';

export interface BYear{
  bName: string;
  code: string;
}

//use class in type combobox
export interface Type {
  bId: string;
  bType: string;
}

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  
  public edited = false;
  bYear = '';
  selectedType = '';
  txtIncDec = '';
  txtRemarks = '';
  selectedYearFrom = '';
  selectedYearTo = '';
  

  years: BYear[];
  types: Type[];
  bName = '';
  lblbYear='';  

  constructor() {
    
    this.years = [
      {bName: '2016-2017', code: 'Normal'},
      {bName: '2017-2018', code: 'Ideal'},
      {bName: '2018-2019', code: 'Worst'},
      {bName: '2019-2020', code: 'Normal'},
      {bName: '2020-2021', code: 'Ideal'}
    ];
    this.types = [
      {bType: 'Ideal', bId: '1'},
      {bType: 'Normal', bId: '2'},
      {bType: 'Worst', bId: '3'}
    ];  
   }

  ngOnInit() {
   
  }
  ImportBudget(){
    
    this.edited = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }
  Create(){
    
    this.edited = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }

  onBudgetChange(item){
    this.lblbYear = item;
  }
}
