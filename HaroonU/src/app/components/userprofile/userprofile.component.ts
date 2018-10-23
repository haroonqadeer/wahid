import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn, zoomOut } from 'ng-animate';
 
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

//declare jQuery
declare var $: any;

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(zoomIn))]),
    trigger('zoom', [transition('* => *', useAnimation(zoomOut))])
  ],
})
export class UserprofileComponent implements OnInit {
  
  bounce: any;
  zoom:any;
  
  chart: Chart;
  eName = '';
  
  public edited = false;
  public edited1 = false;
  
  public edited2 = false;
    
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

  closeResult: string;

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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.init();
    $('#modal_dialog').hide();
  }

  //use this data in chart
  init(){

    let chart = new Chart({
      chart: {
        type: 'area'
      },
      credits: {
        enabled: false
      },
      title: {
        text: ""
      },
      yAxis: {
        title: {
            text: 'User Management Trend'
        }
      },
      series: [{
        name: 'Updations',
        data: [300, 500, 250, 200, 800, 1000, 2000]
    }, {
        name: 'Banned',
        data: [250, 100, 200, 350, 450, 800, 600]
    }, {
        name: 'Additions',
        data: [1, 1, 1, 100, 500, 800, 450]
    }]
    });
    
    this.chart = chart;

  }

  openTestModal(){    
    $('#modal_dialog').fadeIn(500);
  }

  close(){
    $('#modal_dialog').fadeOut(500);
  }
  //onchange Employee
  onEmployeeChange(item){    
    this.eName = this.employees.find( x=> x.eId == item).eName.replace(/['"]+/g, '');    
  }  

  openUserModal(userContent) {
    this.modalService.open(userContent, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  opendUserModal(deleteContent) {
    this.modalService.open(deleteContent, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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

del(item){

  this.userName = item.UserName;
  this.employeeId = item.userId;
  
}

edit(item){
  this.UserId = item.userId;
  this.txtUName = item.UserName;
  this.txtEmail = item.Email;
  this.cmbParty = item.loginDate;
  this.cmbvRole = item.Role;
  this.txtRemarks = item.udate;
  this.txtfrstName = item.FirstName;
  this.txtlstName = item.LastName;
  this.txtvPassword = item.vPassword;
  this.txtvCnfrmPassword = item.vPassword;
  this.txtContact = item.Contact;

  for (var i=0; i<this.userDetail.length;i++)
  {
    if(this.userDetail[i]["userId"]== item.userId){
      this.userDetail.splice(i, 1);
    }
  }
  
}

  delete(){
    for (var i=0; i<this.userDetail.length;i++)
    {
      if(this.userDetail[i]["userId"]== this.employeeId){
        this.userDetail.splice(i, 1);
      }
    }
    this.clear();

    
    this.edited1 = true;
        
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited1 = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }

  animateIt(anim, obj){
    $(obj).removeClass(anim + ' animated').addClass(anim + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(obj).removeClass(anim + ' animated');
    });
  }
}

