import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.scss']
})
export class LeavetypeComponent implements OnInit {

  edited = false;
  edited1 = false;

  txtdPassword = '';
  txtdPin = '';
  constructor() { }

  ngOnInit() {
  }

}
