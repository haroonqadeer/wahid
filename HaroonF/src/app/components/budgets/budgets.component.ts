import { Component, OnInit } from '@angular/core';

//use class in company combobox
export interface data {
  cId: string;
  cName: string;
}

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
   
  }

}
