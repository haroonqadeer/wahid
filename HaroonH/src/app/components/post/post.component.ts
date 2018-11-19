import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TreeNode} from 'primeng/api';

declare var $ :any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],

  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {

  edited = false;
  edited1 = false;

  voucherDate = '';
  
  //ngprime organization chart 
  data1: TreeNode[];

  selectedNode: TreeNode;

  lblOrg='';
  count=0;
  
  constructor() { }

  ngOnInit() {
 //ngprime organizational chart data
 this.data1 = [{
  label: 'Director',
  type: 'person',
  styleClass: 'ui-person',
  expanded: true,
  data: {name:'Ali'},
  children: [{
          label: 'Deputy Director',
          type: 'person',
          styleClass: 'ui-person',
          expanded: true,
          data: {name:'Qureshi'},
          children:[{
            label: 'Assistant Director',
            styleClass: 'department-cfo',
            children:[{
                label: 'APS',
                styleClass: 'department-cto'
            },
            {
                label: 'Assistant',
                styleClass: 'department-cto'
            }]
          }]
        },
        {
            label: 'Deputy Director',
            type: 'person',
            styleClass: 'ui-person',
            expanded: true,
            data: {name:'Razzaq'},
            children:[{
              label: 'Assistant Director',
              styleClass: 'department-cfo'
            }]
        }
      ]
    }];

  }

  onNodeSelect(event) {

    // this.count=this.count + 1;
    // if(this.count==1){
    //   this.lblOrg=event.node.label;
    // }
    
    // if(this.count==2){
    
    //   if(this.lblOrg==event.node.label){
        $('#myModal').modal('show');
    //     this.count=0;
    //   }
    //   else{
    //     this.count=0;
    //   }
      
    
    // }
    
   // window.alert(this.lblOrg);window.alert(event.node.label);window.alert(this.count);
  
    
  }
}
