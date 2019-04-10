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
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';


//----------------------------------------------------------------------------//
//-------------------Working of this typescript file are as follows-----------//
//-------------------Getting branch data into main table -------------------//
//-------------------Add new branch into database --------------------------//
//-------------------Add new city into database --------------------------//
//-------------------Update branch into database ---------------------------//
//-------------------Delete branch from database ---------------------------//
//-------------------Export into PDF, CSV, Excel -----------------------------//
//-------------------Function for email validation -----------------------------//
//-------------------For sorting the record-----------------------------//
//----------------------------------------------------------------------------//


declare var $: any;

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})

export class BranchComponent implements OnInit {

  public contactForm: FormGroup;

  areaCode = false;
  mobileNetworkCode = false;
  branchBox = true;

  serverUrl = "http://localhost:55536/";
  tokenKey = "token";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // list for excel data
  excelDataList = [];

  //*Page Models
  branchId = null;
  branchType = "";
  branchTitle = "";
  branchAddress = "";
  branchCity = "";
  branchEmail = "";
  branchPhone = "";
  branchMobile = "";
  branchFax = "";
  branchWebsite = "";

  branchContactType = "";
  branchCountryCode = "";
  branchAreaCode = "";
  branchMobileNetworkCode = "";
  branchContactNumber = "";

  dbranchId = null;

  //*NgModel For Searching textboxes
  tblSearch = "";

  menuComboText = "";

  //*City Modal Window Models
  cityName = "";

  //*Delete Modal Window Models
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


  branches = [
    {
      branId: 1,
      branType: "Head Quarter",
      branTitle: "Infovative Solution",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com",
      // branContactType: '',
      // branCountryCode: '',
      // branAreaCode: '',
      // branMobileNetworkCode: '',
      // branContactNumber: ''
    },
    {
      branId: 2,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "G-14 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 3,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "G-8 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 4,
      branType: "Head Quarter",
      branTitle: "Alpha Solution",
      branAddress: "G-10 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 5,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "G-12 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 6,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "G-13 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290560",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 7,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "G-15 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290670",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 8,
      branType: "Head Quarter",
      branTitle: "Infovative Tech",
      branAddress: "G-15 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290560",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 9,
      branType: "Head Quarter",
      branTitle: "Infovative Hub",
      branAddress: "G-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512245450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 10,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "G-6 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512295350",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 11,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "G-7 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290550",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 12,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "I-9 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512220450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 13,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "I-8 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 14,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "E-11 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    },
    {
      branId: 15,
      branType: "Branch",
      branTitle: "Infovative Solution",
      branAddress: "D-17 Markaz",
      ctyId: 1,
      ctyName: "Islamabad",
      branEmail: "abc@gmail.com",
      branPhone: "0512290450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branWebsite: "www.google.com"
    }
  ]

  //*use in city combobox
  cities = [
    { ctyId: '1', ctyName: 'Islamabad' },
    { ctyId: '2', ctyName: 'Karachi' },
    { ctyId: '3', ctyName: 'Lahore' },
    { ctyId: '4', ctyName: 'Quetta' }
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
      branches: this.fb.array([])
    });
  }


  @ViewChild("excelDataContent") public excelDataContent: IgxGridComponent;//For excel
  @ViewChild("exportPDF") public exportPDF: ElementRef;// for pdf


  //* get all branch data
  getBranches() {
    return false;

    var Token = localStorage.getItem(this.tokenKey);

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });

    this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
      this.branches = data
    });
  }


  //* Function for saving and updating the data 
  saveBranch() {
    if (this.branchType.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch Type', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchTitle.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch Title', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchAddress.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch Address', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchCity.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch City', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchEmail.trim() == '') {
      this.toastr.errorToastr('Please enter email', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.isEmail(this.branchEmail.trim()) == false) {
      this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchPhone == "" || this.branchPhone.length < 10) {
      this.toastr.errorToastr('Please Enter Branch Phone', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchMobile == "" || this.branchMobile.length < 11) {
      this.toastr.errorToastr('Please Enter Branch Mobile', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchFax == "" || this.branchFax.length < 10) {
      this.toastr.errorToastr('Please Enter Branch Fax', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchWebsite.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch Website', 'Error', { toastTimeout: (2500) });
      return false;
    }
    // contact type conditions
    else if (this.branchContactType.trim() == "") {
      this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchCountryCode.trim() == "") {
      this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchAreaCode.trim() == "" && (this.branchContactType == "Fax" || this.branchContactType == "Telephone")) {
      this.toastr.errorToastr('Please Select Area Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchMobileNetworkCode.trim() == "" && this.branchContactType == "Mobile") {
      this.toastr.errorToastr('Please Select Mobile Network Code', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchContactNumber.trim() == "" || this.branchContactNumber.length < 7) {
      this.toastr.errorToastr('Please Enter Full Number', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {

      // alert(this.branchId);

      if (this.branchId != "") {
        this.app.showSpinner();
        this.app.hideSpinner();
        this.toastr.successToastr('Updated Successfully', 'Success', { toastTimeout: (2500) });
        this.clear();
        $('#branchModal').modal('hide');

        return false;

        // var updateData = { "ID": this.branchAddress, Password: this.userPassword, PIN: this.userPINCode };

        // var token = localStorage.getItem(this.tokenKey);

        // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        // this.http.put(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

        //   if (data.msg != undefined) {
        //     this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
        //     return false;
        //   } else {
        //     this.toastr.successToastr('Record updated Successfully', 'Success!', { toastTimeout: (2500) });
        //     $('#actionModal').modal('hide');
        //     return false;
        //   }

        // });

      }

      else {
        this.app.showSpinner();
        this.app.hideSpinner();
        this.toastr.successToastr('saved successfully', 'Success', { toastTimeout: (2500) });
        this.clear();
        $('#branchModal').modal('hide');
        return false;

        // var saveData = { "Password": this.userPassword, "PIN": this.userPINCode };

        // var token = localStorage.getItem(this.tokenKey);

        // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        // this.http.post(this.serverUrl + 'api/pwCreate', saveData, { headers: reqHeader }).subscribe((data: any) => {

        //   if (data.msg != undefined) {
        //     this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
        //     return false;
        //   } else {
        //     this.toastr.successToastr('Record saved Successfully', 'Success!', { toastTimeout: (2500) });
        //     $('#actionModal').modal('hide');
        //     return false;
        //   }

        // });
      }
    }
  }


  //*Function for Saving city data
  saveCity() {

    if (this.cityName.trim() == '') {
      this.toastr.errorToastr('Please enter city name', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      let data = this.cities.find(x => x.ctyName == this.cityName);

      if (data != undefined) {
        this.toastr.errorToastr('City name already exist', 'Error', { toastTimeout: (2500) });
        return false;
      }
      else {
        this.app.showSpinner();
        this.app.hideSpinner();

        this.toastr.successToastr('Saved successfully', 'Success', { toastTimeout: (2500) });

        this.cities.push({ ctyId: this.cities.length + "", ctyName: this.cityName });

        this.clear();
        // $('#addCityModal').click();
        $('#cityModal').modal('hide');

        return false;

        // var updateData = { "sectionname": this.cityName };

        // var token = localStorage.getItem(this.tokenKey);

        // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

        // this.http.post(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

        //   if (data.msg != undefined) {
        //     this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
        //     return false;
        //   } else {
        //     this.toastr.successToastr('Record Deleted Successfully', 'Success!', { toastTimeout: (2500) });
        //     $('#cityModal').modal('hide');
        //     return false;
        //   }

        // });

      }
    }
  }


  //*Clear the input fields
  clear() {
    this.branchId = 0;
    this.branchType = '';
    this.branchTitle = '';
    this.branchAddress = '';
    this.branchCity = '';
    this.branchEmail = '';
    this.branchPhone = '';
    this.branchMobile = '';
    this.branchFax = '';
    this.branchWebsite = '';

    this.contactForm.reset();

    // this.branchContactType = '';
    // this.branchCountryCode = '';
    // this.branchAreaCode = '';
    // this.branchMobileNetworkCode = '';
    // this.branchContactNumber = '';

    this.cityName = "";

    this.userPassword = '';
    this.userPINCode = '';

    this.dbranchId = "";
  }


  //*Edit Function
  edit(item) {
    this.branchId = item.branId;
    this.branchType = item.branType;
    this.branchTitle = item.branTitle;
    this.branchAddress = item.branAddress;
    this.branchCity = item.ctyId.toString();
    this.branchEmail = item.branEmail;
    this.branchPhone = item.branPhone;
    this.branchMobile = item.branMobile;
    this.branchFax = item.branFax;
    this.branchWebsite = item.branWebsite;
  }


  //*get the "id" of the delete entry 
  deleteTemp(item) {
    this.clear();
    this.dbranchId = item.branId;
  }


  //* Delete Function 
  delete() {
    if (this.userPassword.trim() == "") {
      this.toastr.errorToastr('Please Enter Password', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.userPINCode.trim() == "") {
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

      // var data = { "ID": this.dbranchId, Password: this.userPassword, PIN: this.userPINCode };

      // var token = localStorage.getItem(this.tokenKey);

      // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

      // this.http.put(this.serverUrl + 'api/pwCreate', data, { headers: reqHeader }).subscribe((data: any) => {

      //   if (data.msg != undefined) {
      //     this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
      //     return false;
      //   } else {
      //     this.toastr.successToastr('Record Deleted Successfully', 'Success!', { toastTimeout: (2500) });
      //     $('#actionModal').modal('hide');
      //     return false;
      //   }

      // });
    }
  }


  //* function for email validation
  isEmail(email) {
    return this.app.validateEmail(email);
  }


  //*function for sort table data 
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
      //var completeDataList = [];
      for (var i = 0; i < this.branches.length; i++) {
        this.excelDataList.push({
          branchType: this.branches[i].branType,
          branchTitle: this.branches[i].branTitle,
          branchAddress: this.branches[i].branAddress,
          cityName: this.branches[i].ctyName,
          branchPhone: this.branches[i].branPhone,
          branchEmail: this.branches[i].branEmail,
          brancMobile: this.branches[i].branMobile,
          branchFax: this.branches[i].branFax
        });
      }

      this.csvExportService.export(this.excelDataContent, new IgxCsvExporterOptions("BranchCompleteCSV", CsvFileTypes.CSV));
      this.excelDataList = [];

      //this.csvExportService.exportData(completeDataList, new IgxCsvExporterOptions("BranchCompleteCSV", CsvFileTypes.CSV));
    }
    // case 2: When tblSearch is not empty then assign new data list
    else if (this.tblSearch != "") {
      //var filteredDataList = [];
      for (var i = 0; i < this.branches.length; i++) {
        if (this.branches[i].branTitle.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.branches[i].branAddress.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.branches[i].ctyName.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.branches[i].branPhone.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.branches[i].branEmail.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.branches[i].branMobile.toUpperCase().includes(this.tblSearch.toUpperCase())) {
          this.excelDataList.push({
            branchType: this.branches[i].branType,
            branchTitle: this.branches[i].branTitle,
            branchAddress: this.branches[i].branAddress,
            cityName: this.branches[i].ctyName,
            branchPhone: this.branches[i].branPhone,
            branchEmail: this.branches[i].branEmail,
            brancMobile: this.branches[i].branMobile,
            branchFax: this.branches[i].branFax
          });
        }
      }

      if (this.excelDataList.length > 0) {
        this.csvExportService.export(this.excelDataContent, new IgxCsvExporterOptions("BranchFilterCSV", CsvFileTypes.CSV));
        this.excelDataList = [];

        //this.csvExportService.exportData(filteredDataList, new IgxCsvExporterOptions("BranchFilterCSV", CsvFileTypes.CSV));
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
      for (var i = 0; i < this.branches.length; i++) {
        this.excelDataList.push({
          branchType: this.branches[i].branType,
          branchTitle: this.branches[i].branTitle,
          branchAddress: this.branches[i].branAddress,
          cityName: this.branches[i].ctyName,
          branchPhone: this.branches[i].branPhone,
          branchEmail: this.branches[i].branEmail,
          brancMobile: this.branches[i].branMobile,
          branchFax: this.branches[i].branFax
        });
      }
      this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("BranchCompleteExcel"));
      this.excelDataList = [];
    }
    // case 2: When tblSearch is not empty then assign new data list
    else if (this.tblSearch != "") {
      for (var i = 0; i < this.branches.length; i++) {
        if (this.branches[i].branTitle.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.branches[i].branAddress.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.branches[i].ctyName.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.branches[i].branPhone.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.branches[i].branEmail.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
          this.branches[i].branMobile.toUpperCase().includes(this.tblSearch.toUpperCase())) {
          this.excelDataList.push({
            branchType: this.branches[i].branType,
            branchTitle: this.branches[i].branTitle,
            branchAddress: this.branches[i].branAddress,
            cityName: this.branches[i].ctyName,
            branchPhone: this.branches[i].branPhone,
            branchEmail: this.branches[i].branEmail,
            brancMobile: this.branches[i].branMobile,
            branchFax: this.branches[i].branFax
          });
        }
      }
      if (this.excelDataList.length > 0) {
        this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("BranchFilterExcel"));
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

  addBranchesGroup() {
    return this.fb.group({
      //menuComboText: [''],
      branchContactType: ['', Validators.required],
      branchCountryCode: ['', Validators.required],
      branchAreaCode: [''],
      branchMobileNetworkCode: [''],
      branchContactNumber: ['', Validators.required]
      //menuCombo: ['', Validators.required]
    })
  }

  // Add New ComboBox to an array()
  addBranchContact() {
    this.branchesValue.push(this.addBranchesGroup());
  }

  //Getting new ComboBox from array and show in front page
  get branchesValue() {
    return <FormArray>this.contactForm.get('branches');
  }

  //Deleting every comboBox with specific id which is ([formGroupName]="i")
  deleteBranches(i) {
    this.branchesValue.removeAt(i);
    //alert(i);
    //alert(this.contactForm.get('menuCombo.areaName'));
    //alert(this.branchesValue[i]);
  }

}
