import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from '../../app.component';

import { NgxSpinnerService } from 'ngx-spinner';

import * as jsPDF from 'jspdf';

import {
  IgxExcelExporterOptions,
  IgxExcelExporterService,
  IgxGridComponent,
  IgxCsvExporterService,
  IgxCsvExporterOptions,
  CsvFileTypes
} from "igniteui-angular";

import { HttpHeaders, HttpClient } from '@angular/common/http';


//----------------------------------------------------------------------------//
//-------------------Working of this typescript file are as follows-----------//
//-------------------Getting department into main table -------------------//
//-------------------Getting departmentdata into main table -------------------//
//-------------------Add new departmentdata into database --------------------------//
//-------------------Add new department into database --------------------------//
//-------------------Update department into database ---------------------------//
//-------------------Delete department from database ---------------------------//
//-------------------Export into PDF, CSV, Excel -----------------------------//
//-------------------For sorting the record-----------------------------//
//----------------------------------------------------------------------------//


declare var $: any;
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  serverUrl = "http://localhost:55536/";
  tokenKey = "token";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // list for excel data
  excelDataList = [];
  //excelDataListFilter = [];

  //Page NgModels
  tblSearch = "";

  // Add Department NgModels
  deptId = null;
  deptName = "";
  deptBranch = "";

  //Add department modal window
  departName = "";

  //Delete NgModels
  userPassword = "";
  userPINCode = "";

  // To Access id of Delete Entry
  dDepartmentId = null;

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

  constructor(public toastr: ToastrManager,
    private app: AppComponent,
    private excelExportService: IgxExcelExporterService,
    private csvExportService: IgxCsvExporterService,
    private spinner: NgxSpinnerService,
    private http: HttpClient) { }

  ngOnInit() {
  }

  @ViewChild("excelDataContent") public excelDataContent: IgxGridComponent;//For excel
  @ViewChild("exportPDF") public exportPDF: ElementRef;//For PDF


  //To get departments
  getDepartment() {
    return false;

    var Token = localStorage.getItem(this.tokenKey);

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });

    this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
      this.departments = data
    });
  }


  //To get departments Data for display in main table
  getDepartmentData() {
    return false;

    var Token = localStorage.getItem(this.tokenKey);

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });

    this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
      this.departmentsData = data
    });
  }


  // function for saving and updating the data 
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

      // alert(this.deptId);

      if (this.deptId != "") {
        this.showSpinner();
        this.hideSpinner();
        this.toastr.successToastr('Updated Successfully', 'Success', { toastTimeout: (2500) });
        this.clear();
        $('#departmentModal').modal('hide');
        return false;

        // var updateData = { "ID": this.deptId, Password: this.userPassword, PIN: this.userPINCode };

        // var token = localStorage.getItem(this.tokenKey);

        // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        // this.http.put(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

        //   if (data.msg != undefined) {
        //     this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
        //     return false;
        //   }
        //   else {
        //     this.toastr.successToastr('Record updated Successfully', 'Success!', { toastTimeout: (2500) });
        //     $('#departmentModal').modal('hide');
        //     return false;
        //   }

        // });

      }
      else {
        this.showSpinner();
        this.hideSpinner();
        this.toastr.successToastr('Record Save Successfully', 'Success', { toastTimeout: (2500) });
        $('#departmentModal').modal('hide');
        return false;

        // var saveData = { "Password": this.userPassword, "PIN": this.userPINCode };

        // var token = localStorage.getItem(this.tokenKey);

        // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        // this.http.post(this.serverUrl + 'api/pwCreate', saveData, { headers: reqHeader }).subscribe((data: any) => {

        //   if (data.msg != undefined) {
        //     this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
        //     return false;
        //   }
        //   else {
        //     this.toastr.successToastr('Record saved Successfully', 'Success!', { toastTimeout: (2500) });
        //     $('#departmentModal').modal('hide');
        //     return false;
        //   }
        // });
      }
    }
  }


  // save department function
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

        this.clear();
        // $('#addCityModal').click();
        $('#deptModal').modal('hide');

        return false;

        // var updateData = { "sectionname": this.departName };

        // var token = localStorage.getItem(this.tokenKey);

        // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        // this.http.post(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

        //   if (data.msg != undefined) {
        //     this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
        //     return false;
        //   }
        //   else {
        //     this.toastr.successToastr('Saved Successfully', 'Success!', { toastTimeout: (2500) });
        //     $('#deptModal').modal('hide');
        //     return false;
        //   }
        // });
      }
    }
    ///////
  }


  // clear the input fields
  clear() {
    this.deptName = "";
    this.deptBranch = "";

    this.departName = "";

    this.userPassword = "";
    this.userPINCode = "";

    this.dDepartmentId = "";
  }


  // edit function
  edit(item) {
    this.deptName = item.departmentId;
    this.deptBranch = String(item.branchId);
  }


  // get the "id" of the delete entry 
  deleteTemp(item) {
    this.clear();
    this.dDepartmentId = item.departmentsDataId;
  }


  // delete function
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
      this.clear();
      $('#deleteModal').modal('hide');

      return false;

      // var data = { "ID": this.dDepartmentId, Password: this.userPassword, PIN: this.userPINCode };

      // var token = localStorage.getItem(this.tokenKey);

      // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

      // this.http.put(this.serverUrl + 'api/pwCreate', data, { headers: reqHeader }).subscribe((data: any) => {

      //   if (data.msg != undefined) {
      //     this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
      //     return false;
      //   }
      //   else {
      //     this.toastr.successToastr('Record Deleted Successfully', 'Success!', { toastTimeout: (2500) });
      //     $('#deleteModal').modal('hide');
      //     return false;
      //   }

      // });
    }
  }


  //function for sorting table data 
  setOrder(value: string) {

    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }


  // For Print Purpose 
  printDiv() {

    // var commonCss = ".commonCss{font-family: Arial, Helvetica, sans-serif; text-align: center; }";

    // var cssHeading = ".cssHeading {font-size: 25px; font-weight: bold;}";
    // var cssAddress = ".cssAddress {font-size: 16px; }";
    // var cssContact = ".cssContact {font-size: 16px; }";

    // var tableCss = "table {width: 100%; border-collapse: collapse;}    table thead tr th {text-align: left; font-family: Arial, Helvetica, sans-serif; font-weight: bole; border-bottom: 1px solid black; margin-left: -3px;}     table tbody tr td {font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #ccc; margin-left: -3px; height: 33px;}";

    var printCss = this.app.printCSS();


    //printCss = printCss + "";

    var contents = $("#printArea").html();

    var frame1 = $('<iframe />');
    frame1[0].name = "frame1";
    frame1.css({ "position": "absolute", "top": "-1000000px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
    frameDoc.document.open();

    //Create a new HTML document.
    frameDoc.document.write('<html><head><title>DIV Contents</title>' + "<style>" + printCss + "</style>");


    //Append the external CSS file.  <link rel="stylesheet" href="../../../styles.scss" />  <link rel="stylesheet" href="../../../../node_modules/bootstrap/dist/css/bootstrap.min.css" />
    frameDoc.document.write('<style type="text/css" media="print">/*@page { size: landscape; }*/</style>');

    frameDoc.document.write('</head><body>');

    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');

    frameDoc.document.close();


    //alert(frameDoc.document.head.innerHTML);
    // alert(frameDoc.document.body.innerHTML);

    setTimeout(function () {
      window.frames["frame1"].focus();
      window.frames["frame1"].print();
      frame1.remove();
    }, 500);
  }


  // For PDF Download
  downloadPDF() {

    alert("Pakistan");

    var doc = new jsPDF("p", "pt", "A4"),
      source = $("#printArea")[0],
      margins = {
        top: 75,
        right: 30,
        bottom: 50,
        left: 30,
        width: 150
      };
    doc.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top,
      {
        // y coord
        width: margins.width // max width of content on PDF
      },
      function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
        doc.save("Test.pdf");
      },
      margins
    );
  }


  //For CSV File 
  public downloadCSV() {

    // case 1: When tblSearch is empty then assign full data list
    if (this.tblSearch == "") {
      var completeDataList = [];
      for (var i = 0; i < this.departmentsData.length; i++) {
        //alert(this.tblSearch + " - " + this.departmentsData[i].departmentName)
        completeDataList.push({
          departmentName: this.departmentsData[i].departmentName,
          branchName: this.departmentsData[i].branchName
        });
      }
      this.csvExportService.exportData(completeDataList, new IgxCsvExporterOptions("DepartmentCompleteCSV", CsvFileTypes.CSV));
    }

    // case 2: When tblSearch is not empty then assign new data list
    else if (this.tblSearch != "") {
      var filteredDataList = [];
      for (var i = 0; i < this.departmentsData.length; i++) {

        if (this.departmentsData[i].departmentName.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.departmentsData[i].branchName.toUpperCase().includes(this.tblSearch.toUpperCase())) {
          filteredDataList.push({
            departmentName: this.departmentsData[i].departmentName,
            branchName: this.departmentsData[i].branchName
          });
        }
      }

      if (filteredDataList.length > 0) {
        this.csvExportService.exportData(filteredDataList, new IgxCsvExporterOptions("DepartmentFilterCSV", CsvFileTypes.CSV));
      } else {
        this.toastr.errorToastr('Oops! No data found', 'Error', { toastTimeout: (2500) });
      }
    }
  }


  //For Exce File
  public downloadExcel() {
    //this.excelDataList = [];

    // case 1: When tblSearch is empty then assign full data list
    if (this.tblSearch == "") {
      //var completeDataList = [];
      for (var i = 0; i < this.departmentsData.length; i++) {
        this.excelDataList.push({
          departmentName: this.departmentsData[i].departmentName,
          branchName: this.departmentsData[i].branchName
        });
      }

      //alert("Excel length " + this.excelDataList.length);

      this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("DepartmentCompleteExcel"));
      this.excelDataList = [];

      // alert("Excel length " + this.excelDataList.length);
    }

    // case 2: When tblSearch is not empty then assign new data list
    else if (this.tblSearch != "") {

      for (var i = 0; i < this.departmentsData.length; i++) {
        if (this.departmentsData[i].departmentName.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.departmentsData[i].branchName.toUpperCase().includes(this.tblSearch.toUpperCase())) {
          this.excelDataList.push({
            departmentName: this.departmentsData[i].departmentName,
            branchName: this.departmentsData[i].branchName
          });
        }
      }

      if (this.excelDataList.length > 0) {

        //alert("Filter List " + this.excelDataList.length);

        this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("DepartmentFilterExcel"));
        this.excelDataList = [];

        //alert(" Filter List " + this.excelDataList.length);

      }
      else {
        this.toastr.errorToastr('Oops! No data found', 'Error', { toastTimeout: (2500) });
      }
    }
    //this.excelExportService.export(this.exportDataContent, new IgxExcelExporterOptions("ExportedExcelFileNew"));
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
