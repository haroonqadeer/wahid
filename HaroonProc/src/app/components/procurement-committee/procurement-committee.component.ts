import { Component, OnInit } from '@angular/core';

export interface Procurement {
  id: string;
  name: string;
}

@Component({
  selector: 'app-procurement-committee',
  templateUrl: './procurement-committee.component.html',
  styleUrls: ['./procurement-committee.component.scss']
})
export class ProcurementCommitteeComponent implements OnInit {

  procure: Procurement[] = [
    {id: '1', name: 'Initial Approvels'},
    {id: '2', name: 'Purchase Order'},
    {id: '3', name: 'Financial Approvels'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
