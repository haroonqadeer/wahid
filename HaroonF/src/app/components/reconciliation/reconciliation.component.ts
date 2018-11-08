import { Component, OnInit } from '@angular/core';

export interface Account{
  aNo: string;
}

@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.scss']
})
export class ReconciliationComponent implements OnInit {
 
  public edited = false;
  public edited1 = false;

  accounts:Account[];
  
  constructor() { 
    this.accounts = [
      {aNo: '1223458548'},
      {aNo: '4541254879'},
      {aNo: '1445684254'},
      {aNo: '5548796545'},
      {aNo: '8778451267'}
    ];  
  }

  ngOnInit() {
  }
  
  delete(){
    
    this.edited1 = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited1 = false;
        console.log(this.edited1);
    }.bind(this), 2000);
  }
}
