import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-performance-stand',
  templateUrl: './performance-stand.component.html',
  styleUrls: ['./performance-stand.component.scss']
})
export class PerformanceStandComponent implements OnInit {

  selectedDeduction: string[] = [];
  profiles: SelectItem[];
  
  constructor() {
    this.profiles = [
      {label: 'Accountant', value: 'Accountant'},
      {label: 'Assistant', value: 'Assistant'},
      {label: 'Cashier', value: 'Cashier'}
    ];
    
  }

  ngOnInit() {
    document.getElementById("addProfile").style.visibility = "hidden";
  }

  add(){
    document.getElementById("addProfile").style.visibility = "visible";
   // $('.addProfile').toggle();  
    //window.alert('ok')
  }
  
  addData(){
    document.getElementById("addProfile").style.visibility = "hidden";
   // $('.addProfile').toggle();  
    //window.alert('ok')
  }
}
