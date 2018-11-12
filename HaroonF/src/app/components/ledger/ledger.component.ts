import { Component, OnInit } from '@angular/core';

//use in Account Code combobox
export interface ACode {
  cId: string;
  cTitle: string;
}

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

  cmbACode='';
  query='';
  
  //use in account code combobox
  codes: ACode[] = [
    {cId: '1', cTitle: 'Cash'},
    {cId: '2', cTitle: 'Account Receivable'},
    {cId: '3', cTitle: 'Inventory'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
