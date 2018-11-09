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

  public edited = false;
  public edited1 = false;

  files: TreeNode[];

  constructor(private nodeService: NodeService) { }

  ngOnInit() {    
    this.nodeService.getFileSystem().then(files => this.files = files);
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
