import { Component, OnInit } from '@angular/core';
import {dataNodeTree} from '../../nodeTree/dataNodeTree';
import {NodeServiceModule} from '../../nodeTree/node-service/node-service.module';


@Component({
  selector: 'app-chartofaccount',
  templateUrl: './chartofaccount.component.html',
  styleUrls: ['./chartofaccount.component.scss']
})
export class ChartofaccountComponent implements OnInit {

  files1: dataNodeTree[];

  constructor(private nodeService: NodeServiceModule) { }

  ngOnInit() {    

    this.nodeService.getFilesystem().then(files => this.files1 = files);

  }

}
