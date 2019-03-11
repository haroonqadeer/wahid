import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

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

  @ViewChild("exportDataContent") public exportDataContent: IgxGridComponent;
  @ViewChild("exportPDF") public exportPDF: ElementRef;


  constructor(public toastr: ToastrManager,
    private excelExportService: IgxExcelExporterService,
    private csvExportService: IgxCsvExporterService) { }

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

  //-------------------------------// Downloading PDF File //-------------------------------//

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

  //-------------------------------// Downloading Excel File //-------------------------------//

  public exportExcel() {
    this.excelExportService.export(this.exportDataContent, new IgxExcelExporterOptions("ExportedExcelFileNew"));
  }

  //-------------------------------// Downloading CSV File //-------------------------------//

  public exportCSV() {
    this.csvExportService.exportData(this.departments, new IgxCsvExporterOptions("ExportedCSVFile", CsvFileTypes.CSV));
  }

}
