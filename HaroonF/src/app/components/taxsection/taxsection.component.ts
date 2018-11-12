import { Component, OnInit } from '@angular/core';
 
//use in tax payer type combobox
export interface TaxType {
  tId: string;
  tName: string;
}
//use in Tax Payer Nature combobox
export interface TaxNature {
  nId: string;
  nName: string;
}
//use in Account Code combobox
export interface ACode {
  cId: string;
  cTitle: string;
}

@Component({
  selector: 'app-taxsection',
  templateUrl: './taxsection.component.html',
  styleUrls: ['./taxsection.component.scss']
})
export class TaxsectionComponent implements OnInit {

  public edited = false;
  public edited1 = false;
  query = '';
  txtTSection = '';
  txtPSection = '';
  txtDescription = '';
  cmbTPType = '';
  cmbTPNature = '';
  txtPNature = '';
  cmbACode = '';
  txtTCode = '';
  txtFTax ='';
  txtNFTax = '';
  chkTSStatus = '';
  employeeId = '';
  txtdPassword = '';
  txtdPin = '';
  item = '';
  
  del(item){
    item;
  }
  //use in  tax payer type combobox
  types: TaxType[] = [
    {tId: '1', tName: 'Resident'},
    {tId: '2', tName: 'Non-Resident'}
  ]

  //use in  tax payer nature combobox
  natures: TaxNature[] = [
    {nId: '1', nName: 'Individual'},
    {nId: '2', nName: 'Firm'},
    {nId: '3', nName: 'Association of Persons'},
    {nId: '4', nName: 'Company'},
    {nId: '5', nName: 'Employee'}
  ]
  
  //use in account code combobox
  codes: ACode[] = [
    {cId: '1', cTitle: 'Cash'},
    {cId: '2', cTitle: 'Account Receivable'},
    {cId: '3', cTitle: 'Inventory'}
  ]
  constructor() { }

  ngOnInit() {
  }

  save(){
    
    this.edited = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }

  delete(){
    
    this.edited1 = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited1 = false;
        console.log(this.edited1);
    }.bind(this), 2000);
  }
  edit(item){
    item;
  }
}
