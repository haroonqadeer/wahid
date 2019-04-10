import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from '../../app.component';
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
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


//----------------------------------------------------------------------------//
//-------------------Working of this typescript file are as follows-----------//
//-------------------Getting headquarter data into main table -------------------//
//-------------------Add new headquarter into database --------------------------//
//-------------------Update headquarter into database ---------------------------//
//-------------------Delete headquarter from database ---------------------------//
//-------------------Export into PDF, CSV, Excel -----------------------------//
//-------------------Function for email validation -----------------------------//
//-------------------For sorting the record-----------------------------//
//----------------------------------------------------------------------------//


declare var $: any;
@Component({
  selector: 'app-headquarter',
  templateUrl: './headquarter.component.html',
  styleUrls: ['./headquarter.component.scss']
})

export class HeadquarterComponent implements OnInit {

  public contactForm: FormGroup;

  areaCode = false;
  mobileNetworkCode = false;
  headquarterBox = true;

  serverUrl = "http://localhost:55536/";
  tokenKey = "token";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // list for excel data
  excelDataList = [];

  //Page Models
  officeId = null;
  officeTitle = "";
  officeAddress = "";
  officeEmail = "";
  officePhone = "";
  officeMobile = "";
  officeWebsite = "";

  headquarterContactType = "";
  headquarterCountryCode = "";
  headquarterAreaCode = "";
  headquarterMobileNetworkCode = "";
  headquarterContactNumber = "";

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

  //Country Code
  country = [
    {
      countryId: 1,
      countryName: "Pakistan",
      countryCode: "+92"
    },
    {
      countryId: 2,
      countryName: "Turkey",
      countryCode: "+90"
    },
    {
      countryId: 3,
      countryName: "US",
      countryCode: "+1"
    }
  ];

  //Area Code
  area = [
    {
      areaId: 1,
      areaName: "Islamabad",
      areaCode: "51"
    },
    {
      areaId: 2,
      areaName: "Karachi",
      areaCode: "21"
    },
    {
      areaId: 3,
      areaName: "Lahore",
      areaCode: "42"
    }
  ];

  //Mobile Code
  network = [
    {
      networkId: 1,
      networkName: "Jazz",
      networkCode: "300"
    },
    {
      networkId: 2,
      networkName: "Zong",
      networkCode: "313"
    },
    {
      networkId: 3,
      networkName: "Telenor",
      networkCode: "345"
    },
    {
      networkId: 4,
      networkName: "Ufone",
      networkCode: "333"
    }
  ];

  // offices list
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
    private http: HttpClient,
    private excelExportService: IgxExcelExporterService,
    private csvExportService: IgxCsvExporterService,
    private fb: FormBuilder) { }

  ngOnInit() {
    //Creating Array of ComboBox "branches"
    this.contactForm = this.fb.group({
      headquarters: this.fb.array([])
    });
  }

  @ViewChild("excelDataContent") public excelDataContent: IgxGridComponent;//For excel
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
    // contact type conditions
    else if (this.headquarterContactType.trim() == "") {
      this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.headquarterCountryCode.trim() == "") {
      this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.headquarterAreaCode.trim() == "" && (this.headquarterContactType == "Fax" || this.headquarterContactType == "Telephone")) {
      this.toastr.errorToastr('Please Select Area Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.headquarterMobileNetworkCode.trim() == "" && this.headquarterContactType == "Mobile") {
      this.toastr.errorToastr('Please Select Mobile Network Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.headquarterContactNumber.trim() == "" || this.headquarterContactNumber.length < 7) {
      this.toastr.errorToastr('Please Enter Full Number', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      if (this.officeId != "") {
        this.app.showSpinner();
        this.app.hideSpinner();
        this.toastr.successToastr('Updated Successfully', 'Success', { toastTimeout: (2500) });
        $('#HQModal').modal('hide');
        return false;

        var updateData = { "ID": this.officeId, Password: this.userPassword, PIN: this.userPINCode };

        var token = localStorage.getItem(this.tokenKey);

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        this.http.put(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

          if (data.msg != undefined) {
            this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
            return false;
          }
          else {
            this.toastr.successToastr('Record updated Successfully', 'Success!', { toastTimeout: (2500) });
            $('#HQModal').modal('hide');
            return false;
          }

        });
      }
      else {
        this.app.showSpinner();
        this.app.hideSpinner();
        this.toastr.successToastr('Record Save Successfully', 'Success', { toastTimeout: (2500) });
        $('#HQModal').modal('hide');
        return false;

        var saveData = { "Password": this.userPassword, "PIN": this.userPINCode };

        var token = localStorage.getItem(this.tokenKey);

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        this.http.post(this.serverUrl + 'api/pwCreate', saveData, { headers: reqHeader }).subscribe((data: any) => {

          if (data.msg != undefined) {
            this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
            return false;
          }
          else {
            this.toastr.successToastr('Record saved Successfully', 'Success!', { toastTimeout: (2500) });
            $('#HQModal').modal('hide');
            return false;
          }
        });
      }
    }
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

    this.headquarterContactType = '';
    this.headquarterCountryCode = '';
    this.headquarterAreaCode = '';
    this.headquarterMobileNetworkCode = '';
    this.headquarterContactNumber = '';

    this.userPassword = '';
    this.userPINCode = '';

    this.dofficeId = "";
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
    this.clear();
    this.dofficeId = item.offcId;
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
      this.app.showSpinner();
      this.app.hideSpinner();
      this.toastr.successToastr('Record Deleted Successfully', 'Success', { toastTimeout: (2500) });
      this.clear();
      $('#deleteModal').modal('hide');
      return false;

      var data = { "ID": this.dofficeId, Password: this.userPassword, PIN: this.userPINCode };

      var token = localStorage.getItem(this.tokenKey);

      var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

      this.http.put(this.serverUrl + 'api/pwCreate', data, { headers: reqHeader }).subscribe((data: any) => {

        if (data.msg != undefined) {
          this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
          return false;
        }
        else {
          this.toastr.successToastr('Record Deleted Successfully', 'Success!', { toastTimeout: (2500) });
          $('#deleteModal').modal('hide');
          return false;
        }
      });
    }
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
    // case 1: When tblSearch is empty then assign full data list
    if (this.tblSearch == "") {
      var completeDataList = [];
      for (var i = 0; i < this.offices.length; i++) {
        completeDataList.push({
          officeTitle: this.offices[i].offcTitle,
          officeAddress: this.offices[i].offcAddress,
          officeEmail: this.offices[i].offcEmail,
          officePhone: this.offices[i].offcPhone,
          officeMobile: this.offices[i].offcMobile,
          officeWebsite: this.offices[i].offcWebsite
        });
      }
      this.csvExportService.exportData(completeDataList, new IgxCsvExporterOptions("HeadQuarterCompleteCSV", CsvFileTypes.CSV));
    }
    // case 2: When tblSearch is not empty then assign new data list
    else if (this.tblSearch != "") {
      var filteredDataList = [];
      for (var i = 0; i < this.offices.length; i++) {
        if (this.offices[i].offcTitle.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.offices[i].offcAddress.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.offices[i].offcEmail.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.offices[i].offcPhone.toString().includes(this.tblSearch.toString()) ||
          this.offices[i].offcWebsite.toUpperCase().includes(this.tblSearch.toUpperCase())) {
          filteredDataList.push({
            officeTitle: this.offices[i].offcTitle,
            officeAddress: this.offices[i].offcAddress,
            officeEmail: this.offices[i].offcEmail,
            officePhone: this.offices[i].offcPhone,
            officeMobile: this.offices[i].offcMobile,
            officeWebsite: this.offices[i].offcWebsite
          });
        }
      }

      if (filteredDataList.length > 0) {
        this.csvExportService.exportData(filteredDataList, new IgxCsvExporterOptions("HeadQuarterFilterCSV", CsvFileTypes.CSV));
      }
      else {
        this.toastr.errorToastr('Oops! No data found', 'Error', { toastTimeout: (2500) });
      }
    }
  }


  //For Exce File
  public downloadExcel() {
    // case 1: When tblSearch is empty then assign full data list
    if (this.tblSearch == "") {
      for (var i = 0; i < this.offices.length; i++) {
        this.excelDataList.push({
          officeTitle: this.offices[i].offcTitle,
          officeAddress: this.offices[i].offcAddress,
          officeEmail: this.offices[i].offcEmail,
          officePhone: this.offices[i].offcPhone,
          officeMobile: this.offices[i].offcMobile,
          officeWebsite: this.offices[i].offcWebsite
        });
      }
      this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("HeadQuarterCompleteExcel"));
      this.excelDataList = [];
    }
    // case 2: When tblSearch is not empty then assign new data list
    else if (this.tblSearch != "") {
      for (var i = 0; i < this.offices.length; i++) {
        if (this.offices[i].offcTitle.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.offices[i].offcAddress.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.offices[i].offcEmail.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.offices[i].offcPhone.toString().includes(this.tblSearch.toString()) ||
          this.offices[i].offcWebsite.toUpperCase().includes(this.tblSearch.toUpperCase())) {
          this.excelDataList.push({
            officeTitle: this.offices[i].offcTitle,
            officeAddress: this.offices[i].offcAddress,
            officeEmail: this.offices[i].offcEmail,
            officePhone: this.offices[i].offcPhone,
            officeMobile: this.offices[i].offcMobile,
            officeWebsite: this.offices[i].offcWebsite
          });
        }
      }

      if (this.excelDataList.length > 0) {
        this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("HeadQuarterFilterExcel"));
        this.excelDataList = [];
      }
      else {
        this.toastr.errorToastr('Oops! No data found', 'Error', { toastTimeout: (2500) });
      }
    }
  }

  onChange(contactType) {

    if (contactType == "Fax") {
      this.areaCode = true;
      this.mobileNetworkCode = false;
    }
    else if (contactType == "Telephone") {
      this.areaCode = true;
      this.mobileNetworkCode = false;
    }
    else if (contactType == "Mobile") {
      this.areaCode = false;
      this.mobileNetworkCode = true;
    }
    else {
      return;
    }
  }

  addHeadquarterGroup() {
    return this.fb.group({
      //menuComboText: [''],
      headquarterContactType: ['', Validators.required],
      headquarterCountryCode: ['', Validators.required],
      headquarterAreaCode: [''],
      headquarterMobileNetworkCode: [''],
      headquarterContactNumber: ['', Validators.required]
      //menuCombo: ['', Validators.required]
    })
  }

  // Add New ComboBox to an array()
  addHeadquarterContact() {
    this.headquarterValue.push(this.addHeadquarterGroup());
  }

  //Getting new ComboBox from array and show in front page
  get headquarterValue() {
    return <FormArray>this.contactForm.get('headquarters');
  }

  //Deleting every comboBox with specific id which is ([formGroupName]="i")
  deleteHeadquarters(i) {
    this.headquarterValue.removeAt(i);
    //alert(i);
    //alert(this.contactForm.get('menuCombo.areaName'));
    //alert(this.headquarterValue[i]);
  }


}
