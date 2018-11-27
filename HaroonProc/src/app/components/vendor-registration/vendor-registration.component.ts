import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

//use in department combobox
export interface Department {
  dId: string;
  dName: string;
}

//use in Circle combobox
export interface Circle {
  cId: string;
  cName: string;
}

//use in Types combobox
export interface Type {
  tId: string;
  tName: string;
}

//use in designation combobox
export interface Designation {
  dId: string;
  dName: string;
}

//use in companies combobox
export interface Company {
  cId: string;
  cName: string;
}

//use in Affiliation Type combobox
export interface affType {
  aId: string;
  aName: string;
}

//use in Financial Year combobox
export interface finYear {
  fId: string;
  fName: string;
}

//use in Auditors combobox
export interface Auditor {
  aId: string;
  aName: string;
}

//use in Organization combobox
export interface Organization {
  oId: string;
  oName: string;
}

//use in rank combobox
export interface Rank {
  rId: string;
  rName: string;
}

//use in Rank Health combobox
export interface Health {
  hId: string;
  hName: string;
}

//use in Category combobox
export interface Category {
  cId: string;
  cName: string;
}

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.scss']
})
export class VendorRegistrationComponent implements OnInit {
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  //use in circles combobox
  circles: Circle[] = [
    {cId: '1', cName: 'Attock'},
    {cId: '2', cName: 'Islamabad'},
    {cId: '3', cName: 'Karachi'}

  ];

  //use in Company combobox
  companies: Company[] = [
    {cId: '1', cName: 'Government'},
    {cId: '2', cName: 'Private'},
    {cId: '3', cName: 'Public'}

  ];

  //use in category combobox
  cats: Category[] = [
    {cId: '1', cName: 'abc'},
    {cId: '2', cName: 'def'},
    {cId: '3', cName: 'ghi'}

  ];

  //use in department combobox
  depts: Department[] = [
    {dId: '1', dName: 'Audit'},
    {dId: '2', dName: 'Finance'},
    {dId: '3', dName: 'Human Resource'}

  ];

  //use in designation combobox
  designations: Designation[] = [
    {dId: '1', dName: 'Manager'},
    {dId: '2', dName: 'General Manager'},
    {dId: '3', dName: 'CEO'}

  ];

  //use in type combobox
  types: Type[] = [
    {tId: '1', tName: 'Individual'},
    {tId: '2', tName: 'AOP'},
    {tId: '3', tName: 'Firm'},
    {tId: '3', tName: 'Company'}

  ];

  //use in affiliation type combobox
  affTypes: affType[] = [
    {aId: '1', aName: 'abc'},
    {aId: '2', aName: 'def'},
    {aId: '3', aName: 'ghi'}

  ];

  //use in financial year combobox
  fYears: finYear[] = [
    {fId: '1', fName: '2017-2018'},
    {fId: '2', fName: '2016-2017'},
    {fId: '3', fName: '2015-2016'}

  ];

  //use in auditors combobox
  auditors: Auditor[] = [
    {aId: '1', aName: 'Manager'},
    {aId: '2', aName: 'General Manager'},
    {aId: '3', aName: 'CEO'}

  ];

  //use in organization combobox
  orgs: Organization[] = [
    {oId: '1', oName: 'Private'},
    {oId: '2', oName: 'Public'}

  ];

  //use in ranks combobox
  ranks: Rank[] = [
    {rId: '1', rName: '1'},
    {rId: '2', rName: '2'},
    {rId: '3', rName: '3'}

  ];

  //use in rank health combobox
  rHealths: Health[] = [
    {hId: '1', hName: '1'},
    {hId: '2', hName: '2'},
    {hId: '3', hName: '3'}

  ];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
