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
  
@Component({
  selector: 'app-companydashboard',
  templateUrl: './companydashboard.component.html',
  styleUrls: ['./companydashboard.component.scss'],
 
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

  //company organiztional chart 
  topEmployee = {
    name: 'M/s Indus Motor',
    subordinates: [
        {
            name: 'Karachi HQ',
            subordinates: [
                {
                    name: 'Finance',
                    subordinates: []
                },
                {
                    name: 'Admin',
                    subordinates: []
                },
                {
                  name: 'Production',
                  subordinates: []
                }
            ]
        },
        {
            name: 'Lahore Branch',
            subordinates: [
                {
                    name: 'Sales',
                    subordinates: []
                },
                {
                    name: 'Support',
                    subordinates: []
                }
            ]
        },
        {
            name: 'Kyber Motors',
            subordinates: []
        },
        {
            name: 'Islamabad Motors',
            subordinates: []
        },
        {
            name: 'Toyota Motors',
            subordinates: []
        }
    ]
};

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
                    label: 'Tax',
                    styleClass: 'department-cfo'
                },
                {
                    label: 'Legal',
                    styleClass: 'department-cfo'
                }],
            },
            {
                label: 'COO',
                type: 'person',
                styleClass: 'ui-person',
                expanded: true,
                data: {name:'Mike E.'},
                children:[{
                    label: 'Operations',
                    styleClass: 'department-coo'
                }]
            },
            {
                label: 'CTO',
                type: 'person',
                styleClass: 'ui-person',
                expanded: true,
                data: {name:'Jesse Pinkman'},
                children:[{
                    label: 'Development',
                    styleClass: 'department-cto',
                    expanded: true,
                    children:[{
                        label: 'Analysis',
                        styleClass: 'department-cto'
                    },
                    {
                        label: 'Front End',
                        styleClass: 'department-cto'
                    },
                    {
                        label: 'Back End',
                        styleClass: 'department-cto'
                    }]
                },
                {
                    label: 'QA',
                    styleClass: 'department-cto'
                },
                {
                    label: 'R&D',
                    styleClass: 'department-cto'
                }]
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
}
