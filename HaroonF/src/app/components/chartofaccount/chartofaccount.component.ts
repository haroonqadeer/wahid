import { Component, OnInit } from '@angular/core';
import {TreeNode} from '../../nodeTree/TreeNode';
import {NodeService} from '../../nodeTree/node.service'
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

}
