import { Component, OnInit } from '@angular/core';
import {TreeNode} from '../../nodeTree/TreeNode';
import {NodeService} from '../../nodeTree/node.service'
import {SelectItem} from 'primeng/api';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-chartofaccount',
  templateUrl: './chartofaccount.component.html',
  styleUrls: ['./chartofaccount.component.scss']
})
export class ChartofaccountComponent implements OnInit {

  files: TreeNode[];

  constructor(private nodeService: NodeService) { }

  ngOnInit() {    
    this.nodeService.getFileSystem().then(files => this.files = files);
  }
  // cars: SelectItem[];

  // selectedCars1: string[] = [];

  // selectedCars2: string[] = [];


  // constructor() {
    
  //   this.cars = [
  //     {label: 'Pkr', value: 'Pkr'},
  //     {label: 'Doller', value: 'Doller'},
  // ];

  //  }

  // ngOnInit() {    

  // }

}
