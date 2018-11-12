import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixasset',
  templateUrl: './fixasset.component.html',
  styleUrls: ['./fixasset.component.scss']
})
export class FixassetComponent implements OnInit {

  public edited = false;
  public edited1 = false;
  query = '';
  voucherDate = '';
  

  constructor() { }

  ngOnInit() {
  }

  delete(){
      
    this.edited1 = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited1 = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }
  
  post(){
      
    this.edited = true;
          
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }
}
