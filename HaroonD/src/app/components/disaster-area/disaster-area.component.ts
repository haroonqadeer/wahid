import { Component, OnInit } from '@angular/core';

//use in Institute combobox
export interface Institute {
  iId: string;
  iName: string;
}

//use in Hospital combobox
export interface Hospital {
  hId: string;
  hName: string;
}

@Component({
  selector: 'app-disaster-area',
  templateUrl: './disaster-area.component.html',
  styleUrls: ['./disaster-area.component.scss']
})
export class DisasterAreaComponent implements OnInit {

  //use in city combobox
  insts: Institute[] = [
    {iId: '1', iName: 'School'},
    {iId: '2', iName: 'College'},
    {iId: '3', iName: 'University'}
  ];

  //use in city combobox
  hosps: Hospital[] = [
    {hId: '1', hName: 'City Hospital'},
    {hId: '2', hName: 'Private Hospital'},
    {hId: '3', hName: 'Govt. Hospital'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
