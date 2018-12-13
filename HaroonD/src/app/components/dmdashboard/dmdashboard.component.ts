import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dmdashboard',
  templateUrl: './dmdashboard.component.html',
  styleUrls: ['./dmdashboard.component.scss']
})
export class DmdashboardComponent implements OnInit {

  panelOpenState=true;

  constructor() { }

  ngOnInit() {
  }

}
