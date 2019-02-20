import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
// import { TreeNode } from '../../nodeTree/TreeNode';
// import { NodeService } from '../../nodeTree/node.service';

// import { OrderPipe } from 'ngx-order-pipe';


declare var $: any;


// //For Populate Data in the Employee Table
// export interface Employee {
//   uId: number;
//   uName: string;
//   uEmail: string;
//   uRole: string;
//   uSince: string;
//   lastLogin: string;
// }

//For Selecting Number of Rows Display in the Table
// export interface PageEntryValue {
//   entryNumber: string;
// }

@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.scss']
})
export class UserrolesComponent implements OnInit {

  order: string = "uId";
  reverse: boolean = false;
  //selectedEntry = "5";

  // public edited = false;
  // public edited1 = false;

  /// declaration
  employeeId = '';
  userName = '';
  txtdPassword = '';
  txtdPin = '';
  chkAdd = '';
  chkUpdate = '';
  chkDelete = '';
  chkView = '';
  panelOpenState = true;

  //Page Models
  query = '';
  pageEntryValue = '5';

  // filesTree4: TreeNode[];

  // selectedFiles2: TreeNode[];

  constructor(public toastr: ToastrManager) { }

  employees = [
    {
      uId: 1,
      uName: 'Aamir76',
      uEmail: 2,
      uRole: 8
    },
    {
      uId: 2,
      uName: 'Ali456676',
      uEmail: 4,
      uRole: 12
    },
    {
      uId: 3,
      uName: 'Waqas445776',
      uEmail: 3,
      uRole: 10
    },
    {
      uId: 4,
      uName: 'Umair45676',
      uEmail: 3,
      uRole: 15
    },
    {
      uId: 5,
      uName: 'Touseeq5676',
      uEmail: 6,
      uRole: 60
    }
  ];

  entries = [
    { entryNumber: '5' },
    { entryNumber: '10' },
    { entryNumber: '15' },
    { entryNumber: '25' },
    { entryNumber: '50' },
    { entryNumber: '100' }
  ]


  ngOnInit() {
    //this.nodeService.getFiles().then(files => this.filesTree4 = files);
    // $(document).ready(function () {
    //   $('#example').DataTable();
    // });
  }

  // setOrder(value: string) {
  //   if (this.order === value) {
  //     this.reverse = !this.reverse;
  //   }
  //   this.order = value;
  // }

  setOrder(value: any) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  delete() {
    this.toastr.successToastr('Record Deleted Successfully', 'Error', { toastTimeout: (2500) });
    return false;
  }

  save() {
    this.toastr.successToastr('Record Saved Successfully', 'Error', { toastTimeout: (2500) });
    return false;
  }

  edit() {
    this.toastr.successToastr('Record Edited Successfully', 'Error', { toastTimeout: (2500) });
    return false;
  }
}