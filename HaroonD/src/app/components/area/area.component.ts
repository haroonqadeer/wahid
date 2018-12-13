import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TreeNode} from 'primeng/api';

declare var $ :any;

//use in City combobox
export interface City {
  cId: string;
  cName: string;
}

//use in District combobox
export interface District {
  dId: string;
  dName: string;
}

//use in Type combobox
export interface Type {
  wId: string;
  wName: string;
}

//use in Designation combobox
export interface Designation {
  dId: string;
  dName: string;
}

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],

  encapsulation: ViewEncapsulation.None
})
export class AreaComponent implements OnInit {

  //ngprime organization chart 
  data1: TreeNode[];

  selectedNode: TreeNode;

  selectedCity: City;
  selectedDistrict: District;
  selectedType: Type;
  selectedDesignation: Designation;

  txtdPassword = '';
  txtdPin = '';
  
  //use in city combobox
  cities: City[] = [
    {cId: '1', cName: 'Attock'},
    {cId: '2', cName: 'Islamabad'},
    {cId: '3', cName: 'Karachi'},
    {cId: '4', cName: 'Rawalpindi'}

  ];

  //use in District combobox
  districts: District[] = [
    {dId: '1', dName: 'Islamabad Capital Territory'},
    {dId: '2', dName: 'KPK'},
    {dId: '3', dName: 'Punjab'},
    {dId: '4', dName: 'Sindh'}

  ];

  //use in Types combobox
  workers: Type[] = [
    {wId: '1', wName: 'APS'},
    {wId: '2', wName: 'Assistant'}
  ];

  //use in designation combobox
  designations: Designation[] = [
    {dId: '1', dName: 'Chief'},
    {dId: '2', dName: 'General Manager'},
    {dId: '3', dName: 'Manager'},
    {dId: '4', dName: 'Assistant Director'}

  ];

  constructor() { }

  ngOnInit() {
    //ngprime organizational chart data
    this.data1 = [{
      label: 'Commissioner ',
      type: 'person',
      styleClass: 'ui-person',
      expanded: true,
      data: {name:'Ali'},
      children: [{
        label: 'Deputy Commissioner ',
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        data: {name:'Qureshi'}
      },
      {
        label: 'Deputy Commissioner ',
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        data: {name:'Razzaq'},
        children:[{
          label: 'Assistant Commissioner ',
          styleClass: 'department-cfo'
        }]
      }]
    }];

  }

  onNodeSelect(event) {

    $('#subOrdModal').modal('show');

  }
}
