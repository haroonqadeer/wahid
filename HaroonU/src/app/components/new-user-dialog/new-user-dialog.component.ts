import { Component, OnInit } from '@angular/core';


//use in combobox
export interface Employee {
  eId: string;
  eName: string;
  eDept: string;
}
//use in combobox
export interface Party {
  value: string;
  viewValue: string;
}
//use in combobox
export interface Role {
  rId: string;
  rName: string;
}

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit {

  eName = '';
  
  public edited = false;
  public edited1 = false;
  
 //use in combobox
 parties: Party[] = [
  {value: '1', viewValue: 'Adnan'},
  {value: '2', viewValue: 'Amir'},
  {value: '3', viewValue: 'Haroon'},
  {value: '4', viewValue: 'Nabeel'}
]
//use in combobox
roles: Role[] = [
  {rId: '1', rName: 'Super Admin'},
  {rId: '2', rName: 'Admin'},
  {rId: '3', rName: 'Visitor'}
]
  //use in combobox
  employees: Employee[] = [
    {eId: '1', eName: 'Adnan', eDept: 'IT'},
    {eId: '2', eName: 'Ahmed', eDept: 'Accounts'},
    {eId: '3', eName: 'Ali', eDept: 'Sales'},
    {eId: '4', eName: 'Amir', eDept: 'IT'},
    {eId: '5', eName: 'Haroon', eDept: 'IT'},
    {eId: '6', eName: 'Khan', eDept: 'Sales'},
    {eId: '7', eName: 'Nabeel', eDept: 'IT'},
    {eId: '8', eName: 'Qureshi', eDept: 'Accounts'},
    {eId: '9', eName: 'Salman', eDept: 'Sales'}

  ];
  //page ngModels
  UserId = 0;
  cmbEmployee: '';
  txtPassword = "";
  txtCnfrmPassword = "";
  cmbRole = "";
  txtPin = '';
  txtCnfrmPin = '';
  txtfrstName = '';
  txtlstName = '';
  txtUName = '';
  txtvPassword = '';
  txtvCnfrmPassword = '';
  cmbvRole = '';
  cmbParty = '';
  txtContact = '';
  txtEmail = '';
  txtRemarks = ''; 
  txtdPassword = '';
  txtdPin = '';
  employeeId = 0;
  userName = '';
  public userDetail: Array<{userId: number, UserName: string, Email: string, Role: string, udate: string, loginDate: string, FirstName: string, LastName: string, vPassword: string, Contact: string}> = [];

  disabled = true;

  constructor() { }

  ngOnInit() {
  }

  //onchange Employee
  onEmployeeChange(item){    
    this.eName = this.employees.find( x=> x.eId == item).eName.replace(/['"]+/g, '');    
  }  

  save(){
    //var date =new Date();
    if(this.UserId!=0){
      this.userDetail.push( { userId: this.UserId, UserName: this.txtUName, Email: this.txtEmail, Role: this.cmbvRole, udate: this.txtRemarks, loginDate: this.cmbParty, FirstName: this.txtfrstName, LastName: this.txtlstName, vPassword: this.txtvPassword, Contact: this.txtContact } );
  
      this.edited = true;
          
      //wait 3 Seconds and hide
      setTimeout(function() {
          this.edited = false;
          console.log(this.edited);
      }.bind(this), 2000);
    }else{
      this.UserId=1+this.userDetail.length;
      this.userDetail.push( { userId: this.UserId, UserName: this.txtUName, Email: this.txtEmail, Role: this.cmbvRole, udate: this.txtRemarks, loginDate: this.cmbParty, FirstName: this.txtfrstName, LastName: this.txtlstName, vPassword: this.txtvPassword, Contact: this.txtContact } );

        
      this.edited = true;
          
      //wait 3 Seconds and hide
      setTimeout(function() {
          this.edited = false;
          console.log(this.edited);
      }.bind(this), 2000);
    }
    this.clear();
  }

  saveVisitor(){
    //var date =new Date();
    if(this.UserId!=0){
      this.userDetail.push( { userId: this.UserId, UserName: this.txtUName, Email: this.txtEmail, Role: this.cmbvRole, udate: this.txtRemarks, loginDate: this.cmbParty, FirstName: this.txtfrstName, LastName: this.txtlstName, vPassword: this.txtvPassword, Contact: this.txtContact } );
  
      this.edited = true;
          
      //wait 3 Seconds and hide
      setTimeout(function() {
          this.edited = false;
          console.log(this.edited);
      }.bind(this), 2000);
    }else{
      this.UserId=1+this.userDetail.length;
      this.userDetail.push( { userId: this.UserId, UserName: this.txtUName, Email: this.txtEmail, Role: this.cmbvRole, udate: this.txtRemarks, loginDate: this.cmbParty, FirstName: this.txtfrstName, LastName: this.txtlstName, vPassword: this.txtvPassword, Contact: this.txtContact } );

        
      this.edited = true;
          
      //wait 3 Seconds and hide
      setTimeout(function() {
          this.edited = false;
          console.log(this.edited);
      }.bind(this), 2000);
    }
    this.clear();
  }

  clear(){

    
    //if you want to clear input
    this.UserId = 0;
    this.txtUName = '';
    this.txtEmail = '';
    this.cmbParty = '';
    this.cmbvRole = '';
    this.txtRemarks = '';
    this.txtfrstName = '';
    this.txtlstName = '';
    this.txtvCnfrmPassword = '';
    this.txtvPassword = '';
    this.txtContact = '';

}

}
