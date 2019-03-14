import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { NgxSpinnerService } from 'ngx-spinner';

import {
  IgxExcelExporterOptions,
  IgxExcelExporterService,
  IgxGridComponent,
  IgxCsvExporterService,
  IgxCsvExporterOptions,
  CsvFileTypes
} from "igniteui-angular";

import * as jsPDF from 'jspdf';


declare var $: any;
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  //Page NgModels
  tblSearch = "";

  // Add Department NgModels
  deptName = "";
  deptBranch = "";

  //Add department modal window
  departName = "";

  //Delete NgModels
  userPassword = "";
  userPINCode = "";

  // To Access id of Delete Entry
  dDepartmentId = "";

  //* variables for pagination and orderby pipe
  p = 1;
  order = 'info.name';
  reverse = false;
  sortedCollection: any[];
  itemPerPage = '10';

  //For Branch dropdown
  branches = [
    {
      branchId: '1',
      branchName: "Islamabad(HQ)"
    },
    {
      branchId: '2',
      branchName: "Lahore"
    },
    {
      branchId: '3',
      branchName: "Karachi"
    },
    {
      branchId: '4',
      branchName: "Peshawar"
    }
  ]

  //For Branch dropdown
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

  // For Department Dropdown
  departmentsData = [
    {
      departmentsDataId: 1,
      departmentId: 1,
      departmentName: "Finance",
      branchId: 1,
      branchName: "Islamabad(HQ)"
    },
    {
      departmentsDataId: 2,
      departmentId: 2,
      departmentName: "Human Resource",
      branchId: 1,
      branchName: "Islamabad(HQ)",
    },
    {
      departmentsDataId: 3,
      departmentId: 3,
      departmentName: "Admin",
      branchId: 2,
      branchName: "Lahore"
    },
    {
      departmentsDataId: 4,
      departmentId: 4,
      departmentName: "Procurement",
      branchId: 3,
      branchName: "Karachi"
    },
    {
      departmentsDataId: 5,
      departmentId: 5,
      departmentName: "Medical",
      branchId: 4,
      branchName: "Peshawar"
    },
    {
      departmentsDataId: 6,
      departmentId: 1,
      departmentName: "Finance",
      branchId: 1,
      branchName: "Islamabad(HQ)"
    },
    {
      departmentsDataId: 7,
      departmentId: 2,
      departmentName: "Human Resource",
      branchId: 1,
      branchName: "Islamabad(HQ)",
    },
    {
      departmentsDataId: 8,
      departmentId: 3,
      departmentName: "Admin",
      branchId: 2,
      branchName: "Lahore"
    },
    {
      departmentsDataId: 9,
      departmentId: 4,
      departmentName: "Procurement",
      branchId: 3,
      branchName: "Karachi"
    },
    {
      departmentsDataId: 10,
      departmentId: 5,
      departmentName: "Medical",
      branchId: 4,
      branchName: "Peshawar"
    },
    {
      departmentsDataId: 11,
      departmentId: 1,
      departmentName: "Finance",
      branchId: 1,
      branchName: "Islamabad(HQ)"
    },
    {
      departmentsDataId: 12,
      departmentId: 2,
      departmentName: "Human Resource",
      branchId: 1,
      branchName: "Islamabad(HQ)",
    },
    {
      departmentsDataId: 13,
      departmentId: 3,
      departmentName: "Admin",
      branchId: 2,
      branchName: "Lahore"
    },
    {
      departmentsDataId: 14,
      departmentId: 4,
      departmentName: "Procurement",
      branchId: 3,
      branchName: "Karachi"
    },
    {
      departmentsDataId: 15,
      departmentId: 5,
      departmentName: "Medical",
      branchId: 4,
      branchName: "Peshawar"
    }
  ]

  @ViewChild("exportDataContent") public exportDataContent: IgxGridComponent;
  @ViewChild("exportPDF") public exportPDF: ElementRef;


  constructor(public toastr: ToastrManager,
    private excelExportService: IgxExcelExporterService,
    private csvExportService: IgxCsvExporterService, private spinner: NgxSpinnerService) { }

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
      this.showSpinner();
      this.hideSpinner();
      this.toastr.successToastr('Record Save Successfully', 'Success', { toastTimeout: (2500) });
      $('#departmentModal').modal('hide');
      return false;
    }
  }

  saveDept() {

    ///////
    if (this.departName == "") {
      this.toastr.errorToastr('Please Enter Department', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {

      let data = this.departments.find(x => x.departmentName == this.departName);

      if (data != undefined) {

        this.toastr.errorToastr('Department name is already exists', 'Error', { toastTimeout: (2500) });
        return false;
      }

      else {

        this.showSpinner();
        this.hideSpinner();

        this.toastr.successToastr('Saved successfully', 'Success', { toastTimeout: (2500) });

        this.departments.push({ departmentId: this.departments.length, departmentName: this.departName });

        this.departName = "";
        // $('#addCityModal').click();
        $('#deptModal').modal('hide');

        return false;
      }
    }
    ///////

    // if (this.departName == "") {
    //   this.toastr.errorToastr('Please Enter Department', 'Error', { toastTimeout: (2500) });
    //   return false;
    // }
    // else {
    //   this.toastr.successToastr('Record Save Successfully', 'Success', { toastTimeout: (2500) });
    //   $('#deptModal').modal('hide');
    //   return false;
    // }
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
      this.showSpinner();
      this.hideSpinner();
      this.toastr.successToastr('Record Deleted Successfully', 'Success', { toastTimeout: (2500) });
      $('#deleteModal').modal('hide');
      return false;
    }
  }

  edit(item) {
    this.deptName = item.departmentId;
    this.deptBranch = String(item.branchId);
  }

  clear() {
    this.deptName = "";
    this.deptBranch = "";
  }

  printContent(el) {

    var printCon = document.getElementById(el).innerHTML;
    var WinPrint = window.open("");
    WinPrint.document.write(printCon);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }

  // Downloading PDF File 
  downloadPDF() {

    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function () {
        return true;
      }
    };

    let contentpdf = this.exportPDF.nativeElement;

    doc.text(16, 16, contentpdf);

    doc.fromHTML(contentpdf.innerHTML, 50, 0, {
      'margin': 8,
      'text': 16,
      'elementHandlers': specialElementHandlers
    });

    doc.save('exportTest.pdf');
  }

  // Downloading Excel File
  public exportExcel() {
    this.excelExportService.export(this.exportDataContent, new IgxExcelExporterOptions("ExportedExcelFileNew"));
  }

  // Downloading CSV File
  public exportCSV() {
    this.csvExportService.exportData(this.departments, new IgxCsvExporterOptions("ExportedCSVFile", CsvFileTypes.CSV));
  }
  //function for sort table data 
  setOrder(value: string) {

    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  //functions for delete currency
  deleteTemp(item) {

    this.dDepartmentId = item.departmentsDataId;

  }

  // Functions for Show & Hide Spinner
  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    setTimeout(() => {
      /** spinner ends after process done*/
      this.spinner.hide();
    });
  }

}
