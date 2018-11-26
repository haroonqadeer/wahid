import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

// For District Items ComboBox
export interface District {
  did: string;
  dName: string;
}

// For City Items ComboBox
export interface City {
  cid: string;
  cName: string;
}

// For Area Items ComboBox
export interface Area {
  aid: string;
  aName: string;
}

// For Disaster Type Items ComboBox
export interface DisasterTypeItems {
  disid: string;
  disName: string;
}

// For Message Template Items ComboBox
export interface MsgTemplateItems {
  msgid: string;
  msgName: string;
}

@Component({
  selector: 'app-disaster-alert',
  templateUrl: './disaster-alert.component.html',
  styleUrls: ['./disaster-alert.component.scss']
})
export class DisasterAlertComponent implements OnInit {

  //Declaration
  searchDistrict = '';
  searchCity = '';
  searchArea = '';

  //Page Modals
  cmbDistrict='';
  cmbCity='';
  cmbArea='';

  dName='';
  cName='';
  aName='';

  // For District Items ComboBox
  districts: District[] = [
    {did: '0', dName: 'Federal'},
    {did: '1', dName: 'Punjab'},
    {did: '2', dName: 'Sindh'}
  ];

  // For City Items ComboBox
  cities: City[] = [
    {cid: '0', cName: 'Islamabad'},
    {cid: '1', cName: 'Lahore'},
    {cid: '2', cName: 'Karachi'}
  ];

  // For Area Items ComboBox
  areas: Area[] = [
    {aid: '0', aName: 'G-11'},
    {aid: '1', aName: 'Ring Road'},
    {aid: '2', aName: 'Sadar'}
  ];

  // For Disaster Type Items ComboBox
  disTypeItems: DisasterTypeItems[] = [
    {disid: '0', disName: 'Flood'},
    {disid: '1', disName: 'EarthQuake'},
    {disid: '2', disName: 'Accident'}
  ];

  // For Message Templates Items ComboBox
  msgTemplateItems: MsgTemplateItems[] = [
    {msgid: '0', msgName: 'Flood Message'},
    {msgid: '1', msgName: 'EarthQuake Message'},
    {msgid: '2', msgName: 'Accident Message'}
  ];

  constructor() { }

  ngOnInit() {
  }

  //onchange Employee
  onDistrictChange(item){    
    this.dName = this.districts.find( x=> x.did == item).dName.replace(/['"]+/g, '');    
  } 
  
  //onchange Employee
  onCityChange(item){    
    this.cName = this.cities.find( x=> x.cid == item).cName.replace(/['"]+/g, '');    
  } 
  
  //onchange Employee
  onAreaChange(item){    
    this.aName = this.areas.find( x=> x.aid == item).aName.replace(/['"]+/g, '');    
  } 
}
