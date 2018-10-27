import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.scss']
})
export class UserrolesComponent implements OnInit {

  public edited = false;
  public edited1 = false;
  
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

  save(){
    
    this.edited = true;
        
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 2000);
  }

}
