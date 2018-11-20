import { Component, OnInit } from '@angular/core';

//use in saved mts date combobox
export interface MTSDate {
  mId: string;
  mName: string;
}

@Component({
  selector: 'app-payroll-con',
  templateUrl: './payroll-con.component.html',
  styleUrls: ['./payroll-con.component.scss']
})
export class PayrollConComponent implements OnInit {
  
  edited = false;
  edited1 = false;
  
  cmbDate: MTSDate;

  //use in saved mts date combobox
  dates: MTSDate[] = [
    {mId: '1', mName: 'May 18, 2018'},
    {mId: '2', mName: 'June 24, 2018'},
    {mId: '3', mName: 'Aug 8, 2018'}

  ];

  constructor() { }

  ngOnInit() {
  }

}
