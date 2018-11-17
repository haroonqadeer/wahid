import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {

  showAmount = false;
  showType = false;
  rdbAmount="";

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
