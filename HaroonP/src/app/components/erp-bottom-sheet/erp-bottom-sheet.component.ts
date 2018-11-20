import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-erp-bottom-sheet',
  templateUrl: './erp-bottom-sheet.component.html',
  styleUrls: ['./erp-bottom-sheet.component.scss']
})

export class ErpBottomSheetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //show animation
  showAnim(val){    
    //finance
    if(val==1){
      $('#finance').addClass('animated jello');
    }
    else if (val==2){
      $('#hr').addClass('animated jello');
    }
    else if (val==3){
      $('#user').addClass('animated jello');
    }
    else if (val==4){
      $('#payroll').addClass('animated jello');
    }
    else if (val==5){
      $('#company').addClass('animated jello');
    }
  }

  //open ERP Module
  openModule(val){
    //finance
    if(val==1){
      window.open('http://192.168.88.16:9004/')
    }
    //hr
    else if (val==2){
      window.open('http://192.168.88.16:9003/')
    }
    //user
    else if (val==3){
      window.open('http://192.168.88.16:9001/')
    }
    //payroll
    else if (val==4){
      // window.open('http://192.168.88.16:9005/')
    }
    //company
    else if (val==5){
      window.open('http://192.168.88.16:9002/')
    }
  }
}
