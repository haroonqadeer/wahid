import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { OrderPipe } from 'ngx-order-pipe';
import { strictEqual } from 'assert';
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


//----------------------------------------------------------------------------//
//-------------------Working of this typescript file are as follows-----------//
//-------------------Getting currency data into main table -------------------//
//-------------------Add new currency into database --------------------------//
//-------------------Update currency into database ---------------------------//
//-------------------Delete currency from database ---------------------------//
//-------------------Export into PDF, CSV, Excel -----------------------------//
//-------------------For sorting the record-----------------------------//
//----------------------------------------------------------------------------//


declare var $: any;
@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

    serverUrl = "http://localhost:55536/";
    tokenKey = "token";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    // list for excel data
    excelDataList = [];

    //* variables for pagination and orderby pipe
    p = 1;
    order = 'info.name';
    reverse = false;
    sortedCollection: any[];
    itemPerPage = '10';



    //*variable for print css
    printCss = "{table: {'border': 'solid 1px', 'width' : '100%'}}";

    //*Variables for NgModels
    tblSearch;
    dCurrencyId = '';
    currencyId = '';
    currencyName = '';
    countryName = '';
    txtdPassword = '';
    txtdPin = '';

    //*List Variables
    currencies = [
        { currencyId: '1', currencyName: 'Rupee', countryName: 'Pakistan' },
        { currencyId: '2', currencyName: 'Doller', countryName: 'America' },
        { currencyId: '3', currencyName: 'Pound', countryName: 'England' },
        { currencyId: '4', currencyName: 'Euro', countryName: 'Austria' },
        { currencyId: '5', currencyName: 'Ngultrum', countryName: 'Bhutan' },
        { currencyId: '6', currencyName: 'Boliviano', countryName: 'Bolivia' },
        { currencyId: '7', currencyName: 'Pula', countryName: 'Botswana' },
        { currencyId: '8', currencyName: 'Lev', countryName: 'Bulgaria' },
        { currencyId: '9', currencyName: 'Franc', countryName: 'Burundi' },
        { currencyId: '10', currencyName: 'Escudo', countryName: 'Cabo Verde' },
        { currencyId: '11', currencyName: 'Riel', countryName: 'Cambodia' },
        { currencyId: '12', currencyName: 'Peso', countryName: 'Chile' },
        { currencyId: '13', currencyName: 'Yuan Renminbi', countryName: 'China' },
        { currencyId: '14', currencyName: 'Colon', countryName: 'Costa Rica' },
        { currencyId: '15', currencyName: 'Kuna', countryName: 'Croatia' },
        { currencyId: '16', currencyName: 'Nakfa', countryName: 'Eritrea' },
        { currencyId: '17', currencyName: 'Birr', countryName: 'Ethiopia' },
        { currencyId: '18', currencyName: 'Cedi', countryName: 'Ghana' },
        { currencyId: '19', currencyName: 'Quetzal', countryName: 'Guatemala' },
        { currencyId: '20', currencyName: 'Gourde', countryName: 'Haiti' },
        { currencyId: '21', currencyName: 'Forint', countryName: 'Hungary' },
        { currencyId: '22', currencyName: 'Dinar', countryName: 'Iraq' },
        { currencyId: '23', currencyName: 'Yen', countryName: 'Japan' },
        { currencyId: '24', currencyName: 'Tenge', countryName: 'Kazakhstan' },
        { currencyId: '25', currencyName: 'Kip', countryName: 'Laos' }
    ];

    constructor(private toastr: ToastrManager,
        private app: AppComponent,
        private http: HttpClient,
        private orderPipe: OrderPipe,
        private spinner: NgxSpinnerService,
        private excelExportService: IgxExcelExporterService,
        private csvExportService: IgxCsvExporterService) { }

    ngOnInit() {

        //this.printCss = "{table : {'border': 'solid 1px'}}";
        //alert(this.printCss);

    }


    @ViewChild("excelDataContent") public excelDataContent: IgxGridComponent;//For excel
    @ViewChild("exportPDF") public exportPDF: ElementRef;

    //function for get all saved currencies from db
    getCurrency() {

        return false;

        var Token = localStorage.getItem(this.tokenKey);

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });

        this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
            this.currencies = data
        });

    }


    //Function for save and update currency 
    save() {

        if (this.currencyName.trim() == '') {
            this.toastr.errorToastr('Please enter currency name', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.countryName.trim() == '') {
            this.toastr.errorToastr('Please enter country name', 'Error', { toastTimeout: (2500) });
            return false;
        } else {

            if (this.currencyId != '') {
                this.showSpinner();
                this.hideSpinner();
                this.toastr.successToastr('updated successfully', 'Success', { toastTimeout: (2500) });
                this.clear();
                return false;

                var updateData = { "ID": this.dCurrencyId, Password: this.txtdPassword, PIN: this.txtdPin };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                this.http.put(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record Deleted Successfully', 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }

                });


            } else {
                this.showSpinner();
                this.hideSpinner();
                this.toastr.successToastr('saved successfully', 'Error', { toastTimeout: (2500) });
                this.clear();
                return false;


                var saveData = { "Password": this.txtdPassword, "PIN": this.txtdPin };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                this.http.put(this.serverUrl + 'api/pwCreate', saveData, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record Deleted Successfully', 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }

                });
            }
        }
    }


    //function for empty all fields
    clear() {

        this.currencyId = '';
        this.dCurrencyId = ''
        this.currencyName = '';
        this.countryName = '';
        this.txtdPassword = '';
        this.txtdPin = '';

    }


    //function for edit existing currency 
    edit(item) {

        this.currencyId = item.currencyId;
        this.currencyName = item.currencyName;
        this.countryName = item.countryName;

    }


    //functions for delete currency
    deleteTemp(item) {
        this.clear();
        this.dCurrencyId = item.currencyId;

    }


    delete() {

        if (this.txtdPassword == '') {
            this.toastr.errorToastr('Please enter password', 'Error', { toastTimeout: (2500) });
            return false
        } else if (this.txtdPin == '') {
            this.toastr.errorToastr('Please enter PIN', 'Error', { toastTimeout: (2500) });
            return false
        } else if (this.dCurrencyId == '') {
            this.toastr.errorToastr('Invalid delete request', 'Error', { toastTimeout: (2500) });
            return false
        } else {
            this.showSpinner();
            this.hideSpinner();


            this.toastr.successToastr('Deleted successfully', 'Error', { toastTimeout: (2500) });
            this.clear();

            $('#closeDeleteModel').click();

            return false;

            var data = { "ID": this.dCurrencyId, Password: this.txtdPassword, PIN: this.txtdPin };

            var token = localStorage.getItem(this.tokenKey);

            var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

            this.http.put(this.serverUrl + 'api/pwCreate', data, { headers: reqHeader }).subscribe((data: any) => {

                if (data.msg != undefined) {
                    this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                    return false;
                } else {
                    this.toastr.successToastr('Record Deleted Successfully', 'Success!', { toastTimeout: (2500) });
                    $('#actionModal').modal('hide');
                    return false;
                }

            });

        }

    }


    //function for sort table data 
    setOrder(value: string) {

        if (this.order === value) {
            this.reverse = !this.reverse;
        }

        this.order = value;
    }


    // Function for Print Dive *******************/
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
            for (var i = 0; i < this.currencies.length; i++) {
                //alert(this.tblSearch + " - " + this.departmentsData[i].departmentName)
                completeDataList.push({
                    currencyName: this.currencies[i].currencyName,
                    countryName: this.currencies[i].countryName
                });
            }
            this.csvExportService.exportData(completeDataList, new IgxCsvExporterOptions("CurrencyCompleteCSV", CsvFileTypes.CSV));
        }

        // case 2: When tblSearch is not empty then assign new data list
        else if (this.tblSearch != "") {
            var filteredDataList = [];
            for (var i = 0; i < this.currencies.length; i++) {

                if (this.currencies[i].currencyName.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.currencies[i].countryName.toUpperCase().includes(this.tblSearch.toUpperCase())) {
                    filteredDataList.push({
                        currencyName: this.currencies[i].currencyName,
                        countryName: this.currencies[i].countryName
                    });
                }
            }

            if (filteredDataList.length > 0) {
                this.csvExportService.exportData(filteredDataList, new IgxCsvExporterOptions("CurrencyFilterCSV", CsvFileTypes.CSV));
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
            for (var i = 0; i < this.currencies.length; i++) {
                this.excelDataList.push({
                    currencyName: this.currencies[i].currencyName,
                    countryName: this.currencies[i].countryName
                });
            }

            //alert("Excel length " + this.excelDataList.length);

            this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("CurrencyCompleteExcel"));
            this.excelDataList = [];

            //alert("Excel length " + this.excelDataList.length);
        }

        // case 2: When tblSearch is not empty then assign new data list
        else if (this.tblSearch != "") {

            for (var i = 0; i < this.currencies.length; i++) {
                if (this.currencies[i].currencyName.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.currencies[i].countryName.toUpperCase().includes(this.tblSearch.toUpperCase())) {
                    this.excelDataList.push({
                        currencyName: this.currencies[i].currencyName,
                        countryName: this.currencies[i].countryName
                    });
                }
            }

            if (this.excelDataList.length > 0) {

                //alert("Filter List " + this.excelDataList.length);

                this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("CurrencyFilterExcel"));
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
