import { Component, OnInit } from '@angular/core';

export interface Procurement {
  id: string;
  name: string;
}

@Component({
  selector: 'app-procurement-setting',
  templateUrl: './procurement-setting.component.html',
  styleUrls: ['./procurement-setting.component.scss']
})
export class ProcurementSettingComponent implements OnInit {

  procure: Procurement[] = [
    {id: '1', name: 'Finance Committee'},
    {id: '2', name: 'Admin Committee'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
