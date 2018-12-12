import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface Company {
  id: string;
  name: string;
}
export interface Branch {
  id: string;
  name: string;
}
export interface Department {
  id: string;
  name: string;
}
export interface Section {
  id: string;
  name: string;
}
export interface Subsidary {
  id: string;
  name: string;
}
export interface AuditType {
  id: string;
  name: string;
}
export interface AuditAgainst {
  id: string;
  name: string;
}
export interface AuditFrequency {
  id: string;
  name: string;
}

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  panelOpenState = false;
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  // For Company
  companies: Company[] = [
    {id: '1', name: 'Apple'},
    {id: '2', name: 'Microsoft'},
    {id: '3', name: 'Google'}
  ];

  // For Branch 
  branches: Branch[] = [
    {id: '1', name: 'Head Office'},
    {id: '2', name: 'Newyork'},
    {id: '3', name: 'Silicon Valley'}
  ];

  // For Department 
  departments: Department[] = [
    {id: '1', name: 'HR'},
    {id: '2', name: 'Finance'},
    {id: '3', name: 'Procurement'}
  ];
  
  // For Section 
  sections: Section[] = [
    {id: '1', name: 'Admin'},
    {id: '2', name: 'Audit'},
    {id: '3', name: 'Procure'}
  ];

  // For Section 
  subsidaries: Subsidary[] = [
    {id: '1', name: 'sub 1'},
    {id: '2', name: 'sub 2'},
    {id: '3', name: 'sub 3'}
  ];

  // For Audit Type 
  auditTypes: AuditType[] = [
    {id: '1', name: 'External'},
    {id: '2', name: 'Internal'}
  ];

  // For Audit Against 
  auditAgainst: AuditAgainst[] = [
    {id: '1', name: 'Process'},
    {id: '2', name: 'Asset'},
    {id: '2', name: 'Employee'}
  ];

  // For Audit Frequency 
  auditFrequency: AuditFrequency[] = [
    {id: '1', name: 'Once'},
    {id: '2', name: 'Monthly'},
    {id: '2', name: 'Quaterly'},
    {id: '2', name: 'Half-Year'},
    {id: '2', name: 'Yearly'}
  ];

}
