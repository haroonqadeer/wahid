import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss']
})
export class AuditsComponent implements OnInit {

  public edited = false;
  public edited1 = false;

  txtPassword = '';
  txtPin = '';

  constructor() { }

  ngOnInit() {
  }

}
