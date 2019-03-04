import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

var $: any;
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  // Add Department NgModels
  deptName = "";

  //Delete NgModels
  userPassword = "";
  userPINCode = "";

  departments = [
    {
      departmentId: 1,
      departmentName: "Finance"
    },
    {
      departmentId: 2,
      departmentName: "Human Resource"
    },
    {
      departmentId: 3,
      departmentName: "Admin"
    },
    {
      departmentId: 4,
      departmentName: "Procurement"
    },
    {
      departmentId: 5,
      departmentName: "Medical"
    }
  ]

  constructor(public toastr: ToastrManager) { }

  ngOnInit() {
  }

  saveDepartment() {
    if (this.deptName = "") {
      this.toastr.errorToastr('Please Enter Department', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.toastr.successToastr('Record Save Successfully', 'Success', { toastTimeout: (2500) });
      $('#deptModal').Modal('hide');
      return false;
    }
  }

  delete() {
    if (this.userPassword = "") {
      this.toastr.errorToastr('Please Enter Password', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.userPINCode = "") {
      this.toastr.errorToastr('Please Enter PIN Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.toastr.successToastr('Record Deleted Successfully', 'Success', { toastTimeout: (2500) });
      $('#deleteModal').Modal('hide');
      return false;
    }
  }

}
