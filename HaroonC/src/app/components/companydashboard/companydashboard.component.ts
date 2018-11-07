import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TreeNode} from 'primeng/api';

//use class in company combobox
export interface Company {
  cId: string;
  cName: string;
}

//use class in company type combobox
export interface CompanyType {
    TId: string;
    TName: string;
}
  
//use class in company type combobox
export interface City {
    cId: string;
    cName: string;
}

@Component({
  selector: 'app-companydashboard',
  templateUrl: './companydashboard.component.html',
  styleUrls: ['./companydashboard.component.scss'],
  
encapsulation: ViewEncapsulation.None
 
})
export class CompanydashboardComponent implements OnInit {

    
    public edited = false;

    formGroup1: FormGroup;
    formGroup2: FormGroup;
    formGroup3: FormGroup;

    //variable to hide or unhide div
    solePro = false;
    partner = false;
    ppCom = false;

    //ng modal variables
    cmbCType = '';
    txtCType = '';

  //use in company combobox
  companies: Company[] = [
    {cId: '1', cName: 'M/s Sadiq Hayat & Brothers'},
    {cId: '2', cName: 'M/s Indus Motors'}
  ];

  //use in company type combobox
  types: CompanyType[] = [
    {TId: '1', TName: 'Sole Proprietorship'},
    {TId: '2', TName: 'Partnership'},
    {TId: '3', TName: 'Public Limited Company'},
    {TId: '4', TName: 'Private Limited Company'}
  ];

  //use in city combobox
  cities: City[] = [
    {cId: '1', cName: 'Islamabad'},
    {cId: '2', cName: 'Karachi'},
    {cId: '3', cName: 'Lahore'},
    {cId: '4', cName: 'Quetta'}
  ];

//ngprime organization chart 
data1: TreeNode[];

selectedNode: TreeNode;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
        cmbCType: ['', Validators.required]
    });
    this.formGroup2 = this._formBuilder.group({
        scndCtrl: ['', Validators.required]
    });
    this.formGroup3 = this._formBuilder.group({
        thrdCtrl: ['', Validators.required]
    });

    //ngprime organizational chart data
    this.data1 = [{
        label: 'M/s Indus Motor',
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        data: {name:'M/s Indus Motor'},
        children: [
            {
                label: 'Karachi HQ',
                type: 'person',
                styleClass: 'ui-person',
                expanded: true,
                data: {name:'Karachi HQ'},
                children:[{
                    label: 'Finance',
                    styleClass: 'department-cfo'
                },
                {
                    label: 'Admin',
                    styleClass: 'department-cfo'
                },
                {
                    label: 'Production',
                    styleClass: 'department-cfo'
                }],
            },
            {
                label: 'Lahore Branch',
                type: 'person',
                styleClass: 'ui-person',
                expanded: true,
                data: {name:'Lahore Branch'},
                children:[{
                    label: 'Sales',
                    styleClass: 'department-coo'
                },
                {
                    label: 'Support',
                    styleClass: 'department-coo'
                }]
            },
            {
                label: 'Khyber Motors',
                type: 'person',
                styleClass: 'ui-person',
                expanded: true,
                data: {name:'Khyber Motors'},
                children:[]
            },
            {
                label: 'Islamabad Captial Motors',
                type: 'person',
                styleClass: 'ui-person',
                expanded: true,
                data: {name:'Islamabad Captial Motors'},
                children:[]
            },
            {
                label: 'Toyota G.T Motors',
                type: 'person',
                styleClass: 'ui-person',
                expanded: true,
                data: {name:'Toyota G.T Motors'},
                children:[]
            }
        ]
    }];

  }

  //function to hide or unhide div
  allow_div(){
      if(this.cmbCType == 'Sole Proprietorship'){
        this.solePro = true;
        this.partner = false;
        this.ppCom = false;
      }
      else if(this.cmbCType == 'Partnership'){
        this.partner=true;
        this.solePro = false;
        this.ppCom = false;
      }
      else if(this.cmbCType == 'Public Limited Company'){
        this.ppCom=true;
        this.partner=false;
        this.solePro = false;
      }
      else if(this.cmbCType == 'Private Limited Company'){
        this.ppCom=true;
        this.partner=false;
        this.solePro = false;
      }
  }

  saveHQ(){
   
    this.edited = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }

  saveBranch(){
   
    this.edited = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }

  save(){
   
    this.edited = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }
  saveCity(){
      
    this.edited = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }
}
