import { Component, OnInit } from '@angular/core';

//use in department combobox
export interface Department {
  dId: string;
  dName: string;
}
//use in party combobox
export interface Party {
  pId: string;
  pName: string;
}
//use in g/l account combobox
export interface Account {
  label: string;
  value: string;
}
//use in bank combobox
export interface Bank {
  label: string;
  value: string;
}

@Component({
  selector: 'app-adjustmentvoucher',
  templateUrl: './adjustmentvoucher.component.html',
  styleUrls: ['./adjustmentvoucher.component.scss']
})
export class AdjustmentvoucherComponent implements OnInit {
 
  public edited = false;
  public edited1 = false;

  checked = true;
  disabled=true;
  chkTax='';
  txtpCredit = 0;
  txtpDebit = 0;
  cmbParty : Party;
  selectedAccount : Account;
  accountTitle='';
  query='';
  adjustmentId='';
  txtdPassword='';
  txtdPin='';
  voucherDate='';
  documents='';
  cmbDoc='';
  selectedBank='';
  selectedCurrency='';
  txtAmount=0;
  selectedParty='';
  txtDescription='';
  txtDebit='';
  txtCredit='';
  txtBalance='';
  item='';
  
  cmbDept:Department;

  //use in  Department combobox
  departments: Department[] = [
    {dId: '1', dName: 'Finance'},
    {dId: '2', dName: 'Human Resource'},
    {dId: '3', dName: 'Procurement'},
    {dId: '4', dName: 'Information Technology'}
  ]
  //use in party combobox
  parties: Party[] = [
    {pId: '1', pName: 'Ahmed'},
    {pId: '2', pName: 'Ali'},
    {pId: '3', pName: 'Qureshi'},
    {pId: '4', pName: 'Zaman'}
  ]
  accounts: Account[]=[
    {label: '1', value: 'Cash'},
    {label: '2', value: 'Account Receivable'},
    {label: '3', value: 'Accrued Expenses'},
    {label: '4', value: 'Inventory'},
    {label: '5', value: 'Office Supplies'},
    {label: '6', value: 'Equipment'},
    {label: '7', value: 'Accounts Payable'}
  ];
  banks: Bank[]=[
    {label: 'AL Habib', value: '0001'},
    {label: 'United Bank', value: '0016'},
    {label: 'Standard Chartered', value: '0025'},
    {label: 'Askari Bank', value: '0010'},
    {label: 'Al Falah', value: '0050'}
  ];

  public partyDetail: Array<{AccountTitle: Account, PartyName: string, Debit: number, Credit: number}> = [];
  constructor() { }

  ngOnInit() {
  }

  save(){
      
    this.edited = true;
          
    //wait 2 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }
  add(){   
    this.partyDetail.push( { AccountTitle: this.selectedAccount, PartyName: this.cmbParty.pName, Debit: this.txtpDebit, Credit: this.txtpCredit } );

    this.clear();
  }
  del(item){

    for (var i=0; i<this.partyDetail.length;i++)
    {
      if(this.partyDetail[i]["AccountTitle"]== item.AccountTitle){
        this.partyDetail.splice(i, 1);
      }
    }
  }
  
  delete(){
      
    this.edited1 = true;
          
    //wait 2 Seconds and hide
    setTimeout(function() {
        this.edited1 = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }
  clear(){
    this.selectedAccount={label:'-1',value:'Select Account'};
    this.cmbParty={pId:'-1',pName:'Party Name'};
    this.txtpCredit=0;
    this.txtpDebit=0;
  }
  edit(item){
    item;
  }
  NTax(){}
}
