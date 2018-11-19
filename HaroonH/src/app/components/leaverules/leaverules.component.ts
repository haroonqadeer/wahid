import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-leaverules',
  templateUrl: './leaverules.component.html',
  styleUrls: ['./leaverules.component.scss']
})
export class LeaverulesComponent implements OnInit {

  edited = false;
  edited1 = false;

  leaveId = '';
  dtpApplied = '';
  txtdPassword = '';
  txtdPin = '';
  
  selectedType: string[] = [];
  selectedProfile: string[] = [];
  selectedAllowance: string[] = [];
  selectedDeduction: string[] = [];
  profiles: SelectItem[];
  types: SelectItem[];
  allowances: SelectItem[];

  constructor() { 
    this.profiles = [
      {label: 'Accountant', value: 'Accountant'},
      {label: 'Assistant', value: 'Assistant'},
      {label: 'Cashier', value: 'Cashier'}
    ];
    
    this.types = [
      {label: 'Casual Leave', value: 'Casual Leave'},
      {label: 'Sick Leave', value: 'Sick Leave'},
      {label: 'Medical Leave', value: 'Medical Leave'}
    ];

    this.allowances = [
      {label: '1000', value: '1000'},
      {label: '3000', value: '3000'},
      {label: '7000', value: '7000'}
    ];
  }

  ngOnInit() {
  }

}
