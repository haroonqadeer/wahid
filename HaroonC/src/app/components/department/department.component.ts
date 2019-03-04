import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var $: any;
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  // Add Department NgModels
  deptName = "";
  deptBranch = "";

  //Add department modal window
  departName = "";

  //Delete NgModels
  userPassword = "";
  userPINCode = "";

  //For Branch dropdown
  branches = [
    {
      branchId: 1,
      branchName: "Islamabad(HQ)"
    },
    {
      branchId: 2,
      branchName: "Lahore"
    },
    {
      branchId: 3,
      branchName: "Karachi"
    },
    {
      branchId: 4,
      branchName: "Peshawar"
    }
  ]

  // For Department Dropdown
  departments = [
    {
      departmentId: 1,
      departmentName: "Finance",
      branchName: "Islamabad(HQ)"
    },
    {
      departmentId: 2,
      departmentName: "Human Resource",
      branchName: "Islamabad(HQ)",
    },
    {
      departmentId: 3,
      departmentName: "Admin",
      branchName: "Lahore"
    },
    {
      departmentId: 4,
      departmentName: "Procurement",
      branchName: "Karachi"
    },
    {
      departmentId: 5,
      departmentName: "Medical",
      branchName: "Peshawar"
    }
  ]

  constructor(public toastr: ToastrManager) { }

  ngOnInit() {
  }

  saveDepartment() {
    if (this.deptBranch == "") {
      this.toastr.errorToastr('Please Select Branch', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.deptName == "") {
      this.toastr.errorToastr('Please Select Department', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.toastr.successToastr('Record Save Successfully', 'Success', { toastTimeout: (2500) });
      $('#departmentModal').modal('hide');
      return false;
    }
  }

  saveDept() {
    if (this.departName == "") {
      this.toastr.errorToastr('Please Enter Department', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.toastr.successToastr('Record Save Successfully', 'Success', { toastTimeout: (2500) });
      $('#deptModal').modal('hide');
      return false;
    }
  }

  delete() {
    if (this.userPassword == "") {
      this.toastr.errorToastr('Please Enter Password', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.userPINCode == "") {
      this.toastr.errorToastr('Please Enter PIN Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      this.toastr.successToastr('Record Deleted Successfully', 'Success', { toastTimeout: (2500) });
      $('#deleteModal').modal('hide');
      return false;
    }
  }

}
