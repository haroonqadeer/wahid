import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from '../../app.component';

import { NgxSpinnerService } from 'ngx-spinner';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import * as jsPDF from 'jspdf';

import {
  IgxExcelExporterOptions,
  IgxExcelExporterService,
  IgxGridComponent,
  IgxCsvExporterService,
  IgxCsvExporterOptions,
  CsvFileTypes
} from "igniteui-angular";

declare var $: any;
@Component({
  selector: 'app-headquarter',
  templateUrl: './headquarter.component.html',
  styleUrls: ['./headquarter.component.scss']
})

export class HeadquarterComponent implements OnInit {

  serverUrl = "http://localhost:55536/";
  tokenKey = "token";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Page Models
  officeId = null;
  officeTitle = "";
  officeAddress = "";
  officeEmail = "";
  officePhone = "";
  officeMobile = "";
  officeWebsite = "";

  dofficeId = null;

  // NgModels For Searching Textboxes
  tblSearch = "";

  //Delete Modal Window Models
  userPassword = "";
  userPINCode = "";

  //* variables for pagination and orderby pipe
  p = 1;
  order = 'info.name';
  reverse = false;
  sortedCollection: any[];
  itemPerPage = '10';

  offices = [
    {
      offcId: 1,
      offcTitle: "Infovative Solution",
      offcAddress: "G-11 Markaz",
      offcEmail: "abc@gmail.com",
      offcPhone: "0512290450",
      offcMobile: "03331234567",
      offcWebsite: "www.google.com"
    },
    {
      offcId: 2,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 3,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 4,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 5,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 6,
      offcTitle: "Infovative Solution",
      offcAddress: "G-11 Markaz",
      offcEmail: "abc@gmail.com",
      offcPhone: "0512290450",
      offcMobile: "03331234567",
      offcWebsite: "www.google.com"
    },
    {
      offcId: 7,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 8,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 9,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 10,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 11,
      offcTitle: "Infovative Solution",
      offcAddress: "G-11 Markaz",
      offcEmail: "abc@gmail.com",
      offcPhone: "0512290450",
      offcMobile: "03331234567",
      offcWebsite: "www.google.com"
    },
    {
      offcId: 12,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 13,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 14,
      offcTitle: "Infomatrix",
      offcAddress: "F-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    },
    {
      offcId: 15,
      offcTitle: "Alpha Tech.",
      offcAddress: "E-11 Markaz",
      offcEmail: "def@gmail.com",
      offcPhone: "0513434450",
      offcMobile: "03334434567",
      offcWebsite: "www.youtube.com"
    }
  ];

  constructor(public toastr: ToastrManager,
    private app: AppComponent,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private excelExportService: IgxExcelExporterService,
    private csvExportService: IgxCsvExporterService) { }

  ngOnInit() {
  }

  @ViewChild("exportDataContent") public exportDataContent: IgxGridComponent;
  @ViewChild("exportPDF") public exportPDF: ElementRef;

  //To get departments Data for display in main table
  getOffices() {
    return false;

    var Token = localStorage.getItem(this.tokenKey);

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });

    this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
      this.offices = data
    });
  }

  // function for saving and updating the data 
  saveHQ() {
    if (this.officeTitle.trim() == "") {
      this.toastr.errorToastr('Please Enter Office Title', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.officeAddress.trim() == "") {
      this.toastr.errorToastr('Please Enter Office Address', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.officeEmail.trim() == '') {
      this.toastr.errorToastr('Please enter email', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.isEmail(this.officeEmail.trim()) == false) {
      this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.officePhone == "" || this.officePhone.length < 10) {
      this.toastr.errorToastr('Please Enter Office Phone', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.officeMobile == "" || this.officeMobile.length < 11) {
      this.toastr.errorToastr('Please Enter Office Mobile', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.officeWebsite.trim() == "") {
      this.toastr.errorToastr('Please Enter Office Website', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {

      // alert(this.officeId);

      if (this.officeId != "") {
        this.showSpinner();
        this.hideSpinner();
        this.toastr.successToastr('Updated Successfully', 'Success', { toastTimeout: (2500) });
        $('#HQModal').modal('hide');
        return false;

        // var updateData = { "ID": this.officeId, Password: this.userPassword, PIN: this.userPINCode };

        // var token = localStorage.getItem(this.tokenKey);

        // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        // this.http.put(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

        //   if (data.msg != undefined) {
        //     this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
        //     return false;
        //   }
        //   else {
        //     this.toastr.successToastr('Record updated Successfully', 'Success!', { toastTimeout: (2500) });
        //     $('#HQModal').modal('hide');
        //     return false;
        //   }

        // });
      }
      else {
        this.showSpinner();
        this.hideSpinner();
        this.toastr.successToastr('Record Save Successfully', 'Success', { toastTimeout: (2500) });
        $('#HQModal').modal('hide');
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
        //     $('#HQModal').modal('hide');
        //     return false;
        //   }
        // });

      }

      // this.showSpinner();
      // this.hideSpinner();
      // this.toastr.successToastr('Record Saved Successfully', 'Success', { toastTimeout: (2500) });
      // $('#HQModal').modal('hide');
      // return false;
    }
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

      // var data = { "ID": this.dofficeId, Password: this.userPassword, PIN: this.userPINCode };

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

  //function for edit existing currency 
  edit(item) {

    this.officeId = item.offcId;
    this.officeTitle = item.offcTitle;
    this.officeAddress = item.offcAddress;
    this.officeEmail = item.offcEmail;
    this.officePhone = item.offcPhone;
    this.officeMobile = item.offcMobile;
    this.officeWebsite = item.offcWebsite;

  }

  //get the "id" of the delete entry 
  deleteTemp(item) {
    this.dofficeId = item.offcId;
  }

  //clear the input fields
  clear() {

    this.officeId = 0;
    this.officeTitle = '';
    this.officeAddress = '';
    this.officeEmail = '';
    this.officePhone = '';
    this.officeMobile = '';
    this.officeWebsite = '';

    this.userPassword = '';
    this.userPINCode = '';

    this.dofficeId = "";
  }

  //function for email validation
  isEmail(email) {
    return this.app.validateEmail(email);
  }

  //function for sort table data 
  setOrder(value: string) {

    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  // For Print Purpose 
  printDiv() {

    var commonCss = ".commonCss{font-family: Arial, Helvetica, sans-serif; text-align: center; }";

    var cssHeading = ".cssHeading {font-size: 25px; font-weight: bold;}";
    var cssAddress = ".cssAddress {font-size: 16px; }";
    var cssContact = ".cssContact {font-size: 16px; }";

    var tableCss = "table {width: 100%; border-collapse: collapse;}    table thead tr th {text-align: left; font-family: Arial, Helvetica, sans-serif; font-weight: bole; border-bottom: 1px solid black; margin-left: -3px;}     table tbody tr td {font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #ccc; margin-left: -3px; height: 33px;}";

    var printCss = commonCss + cssHeading + cssAddress + cssContact + tableCss;


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

    var doc = new jsPDF("p", "pt", "A4"),
      source = $("#printArea")[0],
      margins = {
        top: 75,
        right: 30,
        bottom: 50,
        left: 30,
        width: 50
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
    this.csvExportService.exportData(this.offices, new IgxCsvExporterOptions("ExportedCSVFile", CsvFileTypes.CSV));
  }

  //For Exce File
  public downloadExcel() {
    this.excelExportService.export(this.exportDataContent, new IgxExcelExporterOptions("ExportedExcelFileNew"));
  }


  // functions for Show & Hide Spinner
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
