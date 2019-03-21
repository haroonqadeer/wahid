import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

declare var $: any;

//Partners array
export interface Partner {
    cnic: string;
    ntn: string;
    partnerName: string;
    partnerRole: string;
    date: Date;
    share: string;
    telephone: string;
    mobile: string;
    email: string;
    address: string;
    position: string;
}

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

    serverUrl = "http://localhost:55536/";
    tokenKey = "token";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    //*Variables for NgModels
    companyId = '';
    tblSearch;
    cmbCType = '';

    sCnic = '';
    sNtn = '';
    sOwnerName = '';
    sTelephoneNo = '';
    sMobileNo = '';
    sEmail = '';
    sAddress = '';

    pCnic = '';
    pNtn = '';
    pPartnerName = '';
    pPartnerRole = '';
    pDate = '';
    pShare = '';
    pTelephone = '';
    pMobile = '';
    pEmail = '';
    pAddress = '';

    ppCnic = '';
    ppNtn = '';
    ppDirectorName = '';
    ppPosition = '';
    ppShare = '';
    ppTelephone = '';
    ppMobile = '';
    ppEmail = '';
    ppAddress = '';

    bNtn = '';
    bStrn = '';
    bTitle = '';
    bNature = '';
    bDescription = '';
    bBusinessAddress = '';
    bMailingAddress = '';
    bTelephone = '';
    bMobile = '';
    bEmail = '';
    bWebsite = '';
    bFacebook = '';

    txtdPassword = '';
    txtdPin = '';
    dCompanyId = '';


    //*Boolean ng models and variables
    solePro = false;
    partner = false;
    ppCom = false;
    btnStpr1 = false;

    //* variables for pagination and orderby pipe
    p = 1;
    order = 'info.name';
    reverse = false;
    sortedCollection: any[];
    itemPerPage = '10';

    //* Type combo box  (Business types)
    types = [
        { TId: '1', TName: 'Sole Proprietorship' },
        { TId: '2', TName: 'Partnership' },
        { TId: '3', TName: 'Public Limited Company' },
        { TId: '4', TName: 'Private Limited Company' }
    ];

    userDetail = [
        {
            companyId: 1,
            businessType: "Sole Proprietorship",
            title: "Title A",
            nature: "Private Sector",
            ntn: 345454,
            website: "www.Youtube.com"
        },
        {
            companyId: 2,
            businessType: "Partnership",
            title: "Title B",
            nature: "Public Sector",
            ntn: 1545453,
            website: "www.edx.com"
        },
        {
            companyId: 3,
            businessType: "Public Limited Company",
            title: "Title C",
            nature: "Private Sector",
            ntn: 67534653,
            website: "www.facebook.com"
        },
        {
            companyId: 4,
            businessType: "Private Limited Company",
            title: "Title D",
            nature: "Private Sector",
            ntn: 3535663,
            website: "www.udemy.com"
        },
        {
            companyId: 5,
            businessType: "Sole Proprietorship",
            title: "Title A",
            nature: "Private Sector",
            ntn: 34224,
            website: "www.Youtube.com"
        },
        {
            companyId: 6,
            businessType: "Partnership",
            title: "Title B",
            nature: "Public Sector",
            ntn: 155233,
            website: "www.edx.com"
        },
        {
            companyId: 7,
            businessType: "Public Limited Company",
            title: "Title C",
            nature: "Public Sector",
            ntn: 63543,
            website: "www.facebook.com"
        },
        {
            companyId: 8,
            businessType: "Private Limited Company",
            title: "Title D",
            nature: "Private Sector",
            ntn: 5654,
            website: "www.udemy.com"
        },
        {
            companyId: 9,
            businessType: "Sole Proprietorship",
            title: "Title A",
            nature: "Semi-Private Sector",
            ntn: 34444,
            website: "www.Youtube.com"
        },
        {
            companyId: 10,
            businessType: "Partnership",
            title: "Title B",
            nature: "Semi-Private Sector",
            ntn: 155334,
            website: "www.edx.com"
        },
        {
            companyId: 11,
            businessType: "Public Limited Company",
            title: "Title C",
            nature: "Public Sector",
            ntn: 677853,
            website: "www.facebook.com"
        },
        {
            companyId: 12,
            businessType: "Private Limited Company",
            title: "Title D",
            nature: "Semi-Private Sector",
            ntn: 36753,
            website: "www.udemy.com"
        },

    ];

    //* initializing array for partners detail 
    partners: Partner[] = [];

    constructor(private toastr: ToastrManager,
        private app: AppComponent,
        private http: HttpClient,
        private spinner: NgxSpinnerService,
        private excelExportService: IgxExcelExporterService,
        private csvExportService: IgxCsvExporterService) { }

    ngOnInit() {
    }

    @ViewChild("exportDataContent") public exportDataContent: IgxGridComponent;
    @ViewChild("exportPDF") public exportPDF: ElementRef;


    //* function for hide or unhide div
    allowDiv() {

        if (this.cmbCType == '') {
            this.toastr.errorToastr('Please select business type', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.cmbCType == 'Sole Proprietorship') {
            this.solePro = true;
            this.partner = false;
            this.ppCom = false;
        }
        else if (this.cmbCType == 'Partnership') {
            this.partner = true;
            this.solePro = false;
            this.ppCom = false;
        }
        else if (this.cmbCType == 'Public Limited Company' || this.cmbCType == 'Private Limited Company') {
            this.ppCom = true;
            this.partner = false;
            this.solePro = false;
        }

        if (this.cmbCType != '') {
            this.btnStpr1 = true;
        }
    }

    //* Function for save and update company 
    save() {

        if (this.cmbCType == '') {
            this.toastr.errorToastr('Please select business type', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && (this.sCnic == '' || this.sCnic.length < 13)) {
            this.toastr.errorToastr('Please enter owner CNIC', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && (this.sNtn == '' || this.sNtn.length < 8)) {
            this.toastr.errorToastr('Please enter owner NTN', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.solePro == true && this.sOwnerName == '') {
            this.toastr.errorToastr('Please enter owner name', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.solePro == true && (this.sTelephoneNo == '' || this.sTelephoneNo.length < 10)) {
            this.toastr.errorToastr('Please enter owner telephone number', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.solePro == true && (this.sMobileNo == '' || this.sMobileNo.length < 11)) {
            this.toastr.errorToastr('Please enter owner mobile number', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.solePro == true && this.sEmail.trim() == '') {
            this.toastr.errorToastr('Please enter owner emial', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.solePro == true && this.isEmail(this.sEmail) == false) {
            this.toastr.errorToastr('Invalid owner emial', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.solePro == true && this.sAddress == '') {
            this.toastr.errorToastr('Please enter owner address', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.partner == true && (this.partners.length == undefined || this.partners.length < 1)) {
            this.toastr.errorToastr('Please enter partner information', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ppCom == true && (this.ppCnic == '' || this.ppCnic.length < 13)) {
            this.toastr.errorToastr('Please enter director cnic', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ppCom == true && (this.ppNtn == '' || this.ppNtn.length < 8)) {
            this.toastr.errorToastr('Please enter director ntn', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ppCom == true && this.ppDirectorName == '') {
            this.toastr.errorToastr('Please enter director name', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ppCom == true && this.ppPosition == '') {
            this.toastr.errorToastr('Please enter director position', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ppCom == true && this.ppShare == '') {
            this.toastr.errorToastr('Please enter director share', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ppCom == true && (this.ppTelephone == '' || this.ppTelephone.length < 10)) {
            this.toastr.errorToastr('Please enter director telephone', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ppCom == true && (this.ppMobile == '' || this.ppMobile.length < 11)) {
            this.toastr.errorToastr('Please enter director mobile', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ppCom == true && this.ppEmail.trim() == '') {
            this.toastr.errorToastr('Please enter director email', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ppCom == true && this.isEmail(this.ppEmail) == false) {
            this.toastr.errorToastr('Invalid director email', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ppCom == true && this.ppAddress == '') {
            this.toastr.errorToastr('Please enter director address', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bNtn == '' || this.bNtn.length < 8) {
            this.toastr.errorToastr('Please enter business ntn', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bStrn == '' || this.bStrn.length < 10) {
            this.toastr.errorToastr('Please enter business strn', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bTitle == '') {
            this.toastr.errorToastr('Please enter business title', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bNature == '') {
            this.toastr.errorToastr('Please enter business nature', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bDescription == '') {
            this.toastr.errorToastr('Please enter description', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bBusinessAddress == '') {
            this.toastr.errorToastr('Please enter business address', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bMailingAddress == '') {
            this.toastr.errorToastr('Please enter business mailing address', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bTelephone == '' || this.bTelephone.length < 10) {
            this.toastr.errorToastr('Please enter business telephone', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bMobile == '' || this.bMobile.length < 11) {
            this.toastr.errorToastr('Please enter business mobile', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bEmail == '') {
            this.toastr.errorToastr('Please enter business email', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.isEmail(this.bEmail) == false) {
            this.toastr.errorToastr('Invalid business email', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bWebsite == '') {
            this.toastr.errorToastr('Please enter website', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bFacebook == '') {
            this.toastr.errorToastr('Please enter facebook link', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else {
            if (this.companyId != '') {
                if (this.cmbCType == "Sole Proprietorship") {

                    this.partners.push({
                        cnic: this.sCnic,
                        ntn: this.sNtn,
                        partnerName: this.sOwnerName,
                        partnerRole: null,
                        date: null,
                        share: null,
                        telephone: this.sTelephoneNo,
                        mobile: this.sMobileNo,
                        email: this.sEmail,
                        address: this.sAddress,
                        position: null
                    });
                }
                else if (this.cmbCType == "Public Limited Company" || this.cmbCType == "Private Limited Company") {

                    this.partners.push({
                        cnic: this.ppCnic,
                        ntn: this.ppNtn,
                        partnerName: this.ppDirectorName,
                        partnerRole: null,
                        date: null,
                        share: this.ppShare,
                        telephone: this.ppTelephone,
                        mobile: this.ppMobile,
                        email: this.ppEmail,
                        address: this.ppAddress,
                        position: this.ppPosition
                    });
                }

                this.showSpinner();
                this.hideSpinner();
                this.toastr.successToastr('update successfully', 'Success', { toastTimeout: (2500) });
                this.clear(this.companyId);
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

                // this.toastr.successToastr('validation complete information', 'Success!', { toastTimeout: (2500) });
                // return false;
            }
            else {
                if (this.cmbCType == "Sole Proprietorship") {

                    this.partners.push({
                        cnic: this.sCnic,
                        ntn: this.sNtn,
                        partnerName: this.sOwnerName,
                        partnerRole: null,
                        date: null,
                        share: null,
                        telephone: this.sTelephoneNo,
                        mobile: this.sMobileNo,
                        email: this.sEmail,
                        address: this.sAddress,
                        position: null
                    });
                }
                else if (this.cmbCType == "Public Limited Company" || this.cmbCType == "Private Limited Company") {

                    this.partners.push({
                        cnic: this.ppCnic,
                        ntn: this.ppNtn,
                        partnerName: this.ppDirectorName,
                        partnerRole: null,
                        date: null,
                        share: this.ppShare,
                        telephone: this.ppTelephone,
                        mobile: this.ppMobile,
                        email: this.ppEmail,
                        address: this.ppAddress,
                        position: this.ppPosition
                    });
                }

                this.showSpinner();
                this.hideSpinner();
                this.toastr.successToastr('saved successfully', 'Success', { toastTimeout: (2500) });
                this.clear(this.companyId);
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

                // this.toastr.successToastr('validation complete information', 'Success!', { toastTimeout: (2500) });
                // return false;
            }
        }
    }

    //* Function for add new partner for company 
    addPartner() {

        if (this.pCnic == '' || this.pCnic.length < 13) {
            this.toastr.errorToastr('Please enter CNIC', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.pNtn == '' || this.pNtn.length < 8) {
            this.toastr.errorToastr('Please enter NTN', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.pPartnerName == '') {
            this.toastr.errorToastr('Please enter partner name', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.pPartnerRole == '') {
            this.toastr.errorToastr('Please enter partner role', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.pDate == '') {
            this.toastr.errorToastr('Please enter date', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.pShare == '') {
            this.toastr.errorToastr('Please enter share', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.pTelephone == '' || this.pTelephone.length < 10) {
            this.toastr.errorToastr('Please enter telephone number', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.pMobile == '' || this.pMobile.length < 11) {
            this.toastr.errorToastr('Please enter mobile number', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.pEmail == '') {
            this.toastr.errorToastr('Please enter email address', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.isEmail(this.pEmail) == false) {
            this.toastr.errorToastr('Invalid email address', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.pAddress == '') {
            this.toastr.errorToastr('Please enter address', 'Error', { toastTimeout: (2500) });
            return false;
        } else {

            let data = this.partners.find(x => x.cnic == this.pCnic);

            if (data != undefined) {

                this.toastr.errorToastr('Partner already exist', 'Error', { toastTimeout: (2500) });
                return false;

            } else {

                this.showSpinner();
                this.hideSpinner();

                this.partners.push({
                    cnic: this.pCnic,
                    ntn: this.pNtn,
                    partnerName: this.pPartnerName,
                    partnerRole: this.pPartnerRole,
                    date: new Date(this.pDate),
                    share: this.pShare,
                    telephone: this.pTelephone,
                    mobile: this.pMobile,
                    email: this.pEmail,
                    address: this.pAddress,
                    position: null
                });

                this.clearPartner();

            }
        }
    }

    //* Function for empty all fields of partner information 
    clearPartner() {
        this.pCnic = '';
        this.pNtn = '';
        this.pPartnerName = '';
        this.pPartnerRole = '';
        this.pDate = '';
        this.pShare = '';
        this.pTelephone = '';
        this.pMobile = '';
        this.pEmail = '';
        this.pAddress = '';
    }

    //Function for remote partner from list
    remove(item) {
        var index = this.partners.indexOf(item);
        this.partners.splice(index, 1);
    }

    //Function for validate email address
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

    //function for empty all fields
    clear(cId) {

        if (cId > 0) {

            this.ppCom = false;
            this.partner = false;
            this.solePro = false;

            this.btnStpr1 = false;
            this.cmbCType = '';

            this.sCnic = '';
            this.sNtn = '';
            this.sOwnerName = '';
            this.sTelephoneNo = '';
            this.sMobileNo = '';
            this.sEmail = '';
            this.sAddress = '';

            this.clearPartner();

            this.ppCnic = '';
            this.ppNtn = '';
            this.ppDirectorName = '';
            this.ppPosition = '';
            this.ppShare = '';
            this.ppTelephone = '';
            this.ppMobile = '';
            this.ppEmail = '';
            this.ppAddress = '';

            this.bNtn = '';
            this.bStrn = '';
            this.bTitle = '';
            this.bNature = '';
            this.bDescription = '';
            this.bBusinessAddress = '';
            this.bMailingAddress = '';
            this.bTelephone = '';
            this.bMobile = '';
            this.bEmail = '';
            this.bWebsite = '';
            this.bFacebook = '';

            this.txtdPassword = '';
            this.txtdPin = '';
            this.dCompanyId = '';

        }

    }

    //function for edit existing currency 
    edit(item) {

        this.companyId = item.companyId;
        this.cmbCType = item.businessType;

        this.allowDiv();

    }

    //functions for delete company
    deleteTemp(item) {

        this.clear(item.companyId);
        this.dCompanyId = item.companyId;

    }

    delete() {

        if (this.txtdPassword == '') {
            this.toastr.errorToastr('Please enter password', 'Error', { toastTimeout: (2500) });
            return false
        } else if (this.txtdPin == '') {
            this.toastr.errorToastr('Please enter PIN', 'Error', { toastTimeout: (2500) });
            return false
        } else if (this.dCompanyId == '') {
            this.toastr.errorToastr('Invalid delete request', 'Error', { toastTimeout: (2500) });
            return false
        } else {


            this.toastr.successToastr('Deleted successfully', 'Error', { toastTimeout: (2500) });
            this.clear(1);

            $('#closeDeleteModel').click();

            return false;

            var data = { "ID": this.dCompanyId, "Password": this.txtdPassword, "PIN": this.txtdPin };

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
        this.csvExportService.exportData(this.userDetail, new IgxCsvExporterOptions("ExportedCSVFile", CsvFileTypes.CSV));
    }

    //For Exce File
    public downloadExcel() {
        this.excelExportService.export(this.exportDataContent, new IgxExcelExporterOptions("ExportedExcelFileNew"));
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
