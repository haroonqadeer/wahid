import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from '../../app.component';
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
//-------------------Getting company data into main table -------------------//
//-------------------Add new company into database --------------------------//
//-------------------Add new partner into database --------------------------//
//-------------------Update company into database ---------------------------//
//-------------------Delete company from database ---------------------------//
//-------------------Remove partner from database ---------------------------//
//-------------------Export into PDF, CSV, Excel -----------------------------//
//-------------------Function for email validation -----------------------------//
//-------------------For sorting the record-----------------------------//
//-------------------function for hide or unhide div-----------------------------//
//----------------------------------------------------------------------------//


declare var $: any;

//Partners array
export interface Partner {
    cnic: string;
    ntn: string;
    name: string;
    telephone: string;
    mobile: string;
    email: string;
    address: string;
    role: string;
    date: Date;
    share: string;
    position: string;
}

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

    public contactForm: FormGroup;

    areaCode = false;
    mobileNetworkCode = false;
    soleBox = true;
    partnerBox = true;
    ppComBox = true;
    companyBox = true;


    serverUrl = "http://localhost:55536/";
    tokenKey = "token";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    // list for excel data
    excelDataList = [];

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
    soleContactType = "";
    soleCountryCode = "";
    soleAreaCode = "";
    soleMobileNetworkCode = "";
    soleContactNumber = "";

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
    partnerContactType = "";
    partnerCountryCode = "";
    partnerAreaCode = "";
    partnerMobileNetworkCode = "";
    partnerContactNumber = "";

    ppCnic = '';
    ppNtn = '';
    ppDirectorName = '';
    ppPosition = '';
    ppShare = '';
    ppTelephone = '';
    ppMobile = '';
    ppEmail = '';
    ppAddress = '';
    ppComContactType = "";
    ppComCountryCode = "";
    ppComAreaCode = "";
    ppComMobileNetworkCode = "";
    ppComContactNumber = "";

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
    companyContactType = "";
    companyCountryCode = "";
    companyAreaCode = "";
    companyMobileNetworkCode = "";
    companyContactNumber = "";

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


    userDetail = [
        {
            companyId: 1,
            businessType: "Sole Proprietorship",
            title: "Title A",
            nature: "Private Sector",
            ntn: "345454",
            website: "www.Youtube.com"
        },
        {
            companyId: 2,
            businessType: "Partnership",
            title: "Title B",
            nature: "Public Sector",
            ntn: "1545453",
            website: "www.edx.com"
        },
        {
            companyId: 3,
            businessType: "Public Limited Company",
            title: "Title C",
            nature: "Private Sector",
            ntn: "67534653",
            website: "www.facebook.com"
        },
        {
            companyId: 4,
            businessType: "Private Limited Company",
            title: "Title D",
            nature: "Private Sector",
            ntn: "3535663",
            website: "www.udemy.com"
        },
        {
            companyId: 5,
            businessType: "Sole Proprietorship",
            title: "Title A",
            nature: "Private Sector",
            ntn: "34224",
            website: "www.Youtube.com"
        },
        {
            companyId: 6,
            businessType: "Partnership",
            title: "Title B",
            nature: "Public Sector",
            ntn: "155233",
            website: "www.edx.com"
        },
        {
            companyId: 7,
            businessType: "Public Limited Company",
            title: "Title C",
            nature: "Public Sector",
            ntn: "63543",
            website: "www.facebook.com"
        },
        {
            companyId: 8,
            businessType: "Private Limited Company",
            title: "Title D",
            nature: "Private Sector",
            ntn: "5654",
            website: "www.udemy.com"
        },
        {
            companyId: 9,
            businessType: "Sole Proprietorship",
            title: "Title A",
            nature: "Semi-Private Sector",
            ntn: "34444",
            website: "www.Youtube.com"
        },
        {
            companyId: 10,
            businessType: "Partnership",
            title: "Title B",
            nature: "Semi-Private Sector",
            ntn: "155334",
            website: "www.edx.com"
        },
        {
            companyId: 11,
            businessType: "Public Limited Company",
            title: "Title C",
            nature: "Public Sector",
            ntn: "677853",
            website: "www.facebook.com"
        },
        {
            companyId: 12,
            businessType: "Private Limited Company",
            title: "Title D",
            nature: "Semi-Private Sector",
            ntn: "36753",
            website: "www.udemy.com"
        },

    ];

    //* initializing array for partners detail 
    partners: Partner[] = [];

    constructor(private toastr: ToastrManager,
        private app: AppComponent,
        private http: HttpClient,
        private excelExportService: IgxExcelExporterService,
        private csvExportService: IgxCsvExporterService,
        private fb: FormBuilder) { }

    ngOnInit() {
        //Creating Array of ComboBox "sole"
        this.contactForm = this.fb.group({
            sole: this.fb.array([])
        });
        //Creating Array of ComboBox "partner"
        this.contactForm = this.fb.group({
            partnerCon: this.fb.array([])
        });
        //Creating Array of ComboBox "ppCom"
        this.contactForm = this.fb.group({
            ppCom: this.fb.array([])
        });
        //Creating Array of ComboBox "company"
        this.contactForm = this.fb.group({
            company: this.fb.array([])
        });
    }

    @ViewChild("excelDataContent") public excelDataContent: IgxGridComponent;//For excel
    @ViewChild("exportPDF") public exportPDF: ElementRef;//for pdf


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
        }
        else if (this.solePro == true && this.sOwnerName == '') {
            this.toastr.errorToastr('Please enter owner name', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && (this.sTelephoneNo == '' || this.sTelephoneNo.length < 10)) {
            this.toastr.errorToastr('Please enter owner telephone number', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && (this.sMobileNo == '' || this.sMobileNo.length < 11)) {
            this.toastr.errorToastr('Please enter owner mobile number', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && this.sEmail.trim() == '') {
            this.toastr.errorToastr('Please enter owner emial', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && this.isEmail(this.sEmail) == false) {
            this.toastr.errorToastr('Invalid owner emial', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && this.sAddress == '') {
            this.toastr.errorToastr('Please enter owner address', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // contact type conditions
        else if (this.solePro == true && this.soleContactType.trim() == "") {
            this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && this.soleCountryCode.trim() == "") {
            this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && this.soleAreaCode.trim() == "" && (this.soleContactType == "Fax" || this.soleContactType == "Telephone")) {
            this.toastr.errorToastr('Please Select Area Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && this.soleMobileNetworkCode.trim() == "" && this.soleContactType == "Mobile") {
            this.toastr.errorToastr('Please Select Mobile Network Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.solePro == true && this.soleContactNumber.trim() == "" || this.soleContactNumber.length < 7) {
            this.toastr.errorToastr('Please Enter Full Number', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.partner == true && (this.partners.length == undefined || this.partners.length < 1)) {
            this.toastr.errorToastr('Please enter partner information', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // // contact type conditions
        // else if (this.partner == true && this.partnerContactType.trim() == "") {
        //     this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.partner == true && this.partnerCountryCode.trim() == "") {
        //     this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.partner == true && this.partnerAreaCode.trim() == "" && (this.partnerContactType == "Fax" || this.partnerContactType == "Telephone")) {
        //     this.toastr.errorToastr('Please Select Area Code', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.partner == true && this.partnerMobileNetworkCode.trim() == "" && this.partnerContactType == "Mobile") {
        //     this.toastr.errorToastr('Please Select Mobile Network Code', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.partner == true && this.partnerContactNumber.trim() == "" || this.partnerContactNumber.length < 7) {
        //     this.toastr.errorToastr('Please Enter Full Number', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        else if (this.ppCom == true && (this.ppCnic == '' || this.ppCnic.length < 13)) {
            this.toastr.errorToastr('Please enter director cnic', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && (this.ppNtn == '' || this.ppNtn.length < 8)) {
            this.toastr.errorToastr('Please enter director ntn', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && this.ppDirectorName == '') {
            this.toastr.errorToastr('Please enter director name', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && this.ppPosition == '') {
            this.toastr.errorToastr('Please enter director position', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && this.ppShare == '') {
            this.toastr.errorToastr('Please enter director share', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && (this.ppTelephone == '' || this.ppTelephone.length < 10)) {
            this.toastr.errorToastr('Please enter director telephone', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && (this.ppMobile == '' || this.ppMobile.length < 11)) {
            this.toastr.errorToastr('Please enter director mobile', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && this.ppEmail.trim() == '') {
            this.toastr.errorToastr('Please enter director email', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && this.isEmail(this.ppEmail) == false) {
            this.toastr.errorToastr('Invalid director email', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && this.ppAddress == '') {
            this.toastr.errorToastr('Please enter director address', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // contact type conditions
        else if (this.ppCom == true && this.ppComContactType.trim() == "") {
            this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && this.ppComCountryCode.trim() == "") {
            this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && this.ppComAreaCode.trim() == "" && (this.ppComContactType == "Fax" || this.ppComContactType == "Telephone")) {
            this.toastr.errorToastr('Please Select Area Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && this.ppComMobileNetworkCode.trim() == "" && this.ppComContactType == "Mobile") {
            this.toastr.errorToastr('Please Select Mobile Network Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ppCom == true && this.ppComContactNumber.trim() == "" || this.ppComContactNumber.length < 7) {
            this.toastr.errorToastr('Please Enter Full Number', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bNtn == '' || this.bNtn.length < 8) {
            this.toastr.errorToastr('Please enter business ntn', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bStrn == '' || this.bStrn.length < 10) {
            this.toastr.errorToastr('Please enter business strn', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bTitle == '') {
            this.toastr.errorToastr('Please enter business title', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bNature == '') {
            this.toastr.errorToastr('Please enter business nature', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bDescription == '') {
            this.toastr.errorToastr('Please enter description', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bBusinessAddress == '') {
            this.toastr.errorToastr('Please enter business address', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bMailingAddress == '') {
            this.toastr.errorToastr('Please enter business mailing address', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bTelephone == '' || this.bTelephone.length < 10) {
            this.toastr.errorToastr('Please enter business telephone', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bMobile == '' || this.bMobile.length < 11) {
            this.toastr.errorToastr('Please enter business mobile', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bEmail == '') {
            this.toastr.errorToastr('Please enter business email', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.isEmail(this.bEmail) == false) {
            this.toastr.errorToastr('Invalid business email', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bWebsite == '') {
            this.toastr.errorToastr('Please enter website', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.bFacebook == '') {
            this.toastr.errorToastr('Please enter facebook link', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // contact type conditions
        else if (this.companyContactType.trim() == "") {
            this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.companyCountryCode.trim() == "") {
            this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.companyAreaCode.trim() == "" && (this.companyContactType == "Fax" || this.companyContactType == "Telephone")) {
            this.toastr.errorToastr('Please Select Area Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.companyMobileNetworkCode.trim() == "" && this.companyContactType == "Mobile") {
            this.toastr.errorToastr('Please Select Mobile Network Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.companyContactNumber.trim() == "" || this.companyContactNumber.length < 7) {
            this.toastr.errorToastr('Please Enter Full Number', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else {

            if (this.cmbCType == "Sole Proprietorship") {
                this.partners = [];
                this.clearPartner();

                this.partners.push({
                    cnic: this.sCnic,
                    ntn: this.sNtn,
                    name: this.sOwnerName,
                    role: null,
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
                this.partners = [];
                this.clearPartner();

                this.partners.push({
                    cnic: this.ppCnic,
                    ntn: this.ppNtn,
                    name: this.ppDirectorName,
                    role: null,
                    date: null,
                    share: this.ppShare,
                    telephone: this.ppTelephone,
                    mobile: this.ppMobile,
                    email: this.ppEmail,
                    address: this.ppAddress,
                    position: this.ppPosition
                });
            }
            if (this.companyId != '') {
                this.app.showSpinner();
                this.app.hideSpinner();
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
                this.app.showSpinner();
                this.app.hideSpinner();
                this.toastr.successToastr('saved successfully', 'Success', { toastTimeout: (2500) });
                this.clear(this.companyId);
                return false;

                var saveData = { "Password": this.txtdPassword, "PIN": this.txtdPin };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                this.http.post(this.serverUrl + 'api/pwCreate', saveData, { headers: reqHeader }).subscribe((data: any) => {

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
        }
        else if (this.pNtn == '' || this.pNtn.length < 8) {
            this.toastr.errorToastr('Please enter NTN', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.pPartnerName == '') {
            this.toastr.errorToastr('Please enter partner name', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.pPartnerRole == '') {
            this.toastr.errorToastr('Please enter partner role', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.pDate == '') {
            this.toastr.errorToastr('Please enter date', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.pShare == '') {
            this.toastr.errorToastr('Please enter share', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.pTelephone == '' || this.pTelephone.length < 10) {
            this.toastr.errorToastr('Please enter telephone number', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.pMobile == '' || this.pMobile.length < 11) {
            this.toastr.errorToastr('Please enter mobile number', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.pEmail == '') {
            this.toastr.errorToastr('Please enter email address', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.isEmail(this.pEmail) == false) {
            this.toastr.errorToastr('Invalid email address', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.pAddress == '') {
            this.toastr.errorToastr('Please enter address', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // contact type conditions
        else if (this.partnerContactType.trim() == "") {
            this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.partnerCountryCode.trim() == "") {
            this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.partnerAreaCode.trim() == "" && (this.partnerContactType == "Fax" || this.partnerContactType == "Telephone")) {
            this.toastr.errorToastr('Please Select Area Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.partnerMobileNetworkCode.trim() == "" && this.partnerContactType == "Mobile") {
            this.toastr.errorToastr('Please Select Mobile Network Code', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.partnerContactNumber.trim() == "" || this.partnerContactNumber.length < 7) {
            this.toastr.errorToastr('Please Enter Full Number', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else {

            let data = this.partners.find(x => x.cnic == this.pCnic);

            if (data != undefined) {

                this.toastr.errorToastr('Partner already exist', 'Error', { toastTimeout: (2500) });
                return false;

            }
            else {

                this.app.showSpinner();
                this.app.hideSpinner();

                this.partners.push({
                    cnic: this.pCnic,
                    ntn: this.pNtn,
                    name: this.pPartnerName,
                    telephone: this.pTelephone,
                    mobile: this.pMobile,
                    email: this.pEmail,
                    address: this.pAddress,
                    role: this.pPartnerRole,
                    date: new Date(this.pDate),
                    share: this.pShare,
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

        this.contactForm.reset();
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

            this.contactForm.reset();

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
        }
        else if (this.txtdPin == '') {
            this.toastr.errorToastr('Please enter PIN', 'Error', { toastTimeout: (2500) });
            return false
        }
        else if (this.dCompanyId == '') {
            this.toastr.errorToastr('Invalid delete request', 'Error', { toastTimeout: (2500) });
            return false
        }
        else {


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
            for (var i = 0; i < this.userDetail.length; i++) {
                completeDataList.push({
                    businessType: this.userDetail[i].businessType,
                    title: this.userDetail[i].title,
                    nature: this.userDetail[i].nature,
                    ntn: this.userDetail[i].ntn,
                    website: this.userDetail[i].website
                });
            }
            this.csvExportService.exportData(completeDataList, new IgxCsvExporterOptions("CompanyCompleteCSV", CsvFileTypes.CSV));
        }
        // case 2: When tblSearch is not empty then assign new data list
        else if (this.tblSearch != "") {
            var filteredDataList = [];
            for (var i = 0; i < this.userDetail.length; i++) {

                if (this.userDetail[i].businessType.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.userDetail[i].title.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.userDetail[i].nature.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.userDetail[i].ntn.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.userDetail[i].website.toUpperCase().includes(this.tblSearch.toUpperCase())) {
                    filteredDataList.push({
                        businessType: this.userDetail[i].businessType,
                        title: this.userDetail[i].title,
                        nature: this.userDetail[i].nature,
                        ntn: this.userDetail[i].ntn,
                        website: this.userDetail[i].website
                    });
                }
            }
            if (filteredDataList.length > 0) {
                this.csvExportService.exportData(filteredDataList, new IgxCsvExporterOptions("CompanyFilterCSV", CsvFileTypes.CSV));
            } else {
                this.toastr.errorToastr('Oops! No data found', 'Error', { toastTimeout: (2500) });
            }
        }
    }

    //For Exce File
    public downloadExcel() {
        // case 1: When tblSearch is empty then assign full data list
        if (this.tblSearch == "") {
            //var completeDataList = [];
            for (var i = 0; i < this.userDetail.length; i++) {
                this.excelDataList.push({
                    businessType: this.userDetail[i].businessType,
                    title: this.userDetail[i].title,
                    nature: this.userDetail[i].nature,
                    ntn: this.userDetail[i].ntn,
                    website: this.userDetail[i].website
                });
            }
            this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("CompanyCompleteExcel"));
            this.excelDataList = [];
        }
        // case 2: When tblSearch is not empty then assign new data list
        else if (this.tblSearch != "") {
            for (var i = 0; i < this.userDetail.length; i++) {
                if (this.userDetail[i].businessType.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.userDetail[i].title.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.userDetail[i].nature.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.userDetail[i].ntn.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.userDetail[i].website.toUpperCase().includes(this.tblSearch.toUpperCase())) {
                    this.excelDataList.push({
                        businessType: this.userDetail[i].businessType,
                        title: this.userDetail[i].title,
                        nature: this.userDetail[i].nature,
                        ntn: this.userDetail[i].ntn,
                        website: this.userDetail[i].website
                    });
                }
            }
            if (this.excelDataList.length > 0) {
                this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("CompanyFilterExcel"));
                this.excelDataList = [];
            }
            else {
                this.toastr.errorToastr('Oops! No data found', 'Error', { toastTimeout: (2500) });
            }
        }
    }


    //* function for hide or unhide div
    allowDiv() {
        if (this.cmbCType == '') {
            this.toastr.errorToastr('Please select business type', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.cmbCType == 'Sole Proprietorship') {
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


    //sole
    addSoleGroup() {
        return this.fb.group({
            //menuComboText: [''],
            soleContactType: ['', Validators.required],
            soleCountryCode: ['', Validators.required],
            soleAreaCode: [''],
            soleMobileNetworkCode: [''],
            soleContactNumber: ['', Validators.required]
            //menuCombo: ['', Validators.required]
        })
    }

    // Add New ComboBox to an array()
    addSoleContact() {
        this.soleValue.push(this.addSoleGroup());
    }

    //Getting new ComboBox from array and show in front page
    get soleValue() {
        return <FormArray>this.contactForm.get('sole');
    }

    //Deleting every comboBox with specific id which is ([formGroupName]="i")
    deleteSole(i) {
        this.soleValue.removeAt(i);
        //alert(i);
        //alert(this.contactForm.get('menuCombo.areaName'));
        //alert(this.soleValue[i]);
    }


    // partner
    addPartnerGroup() {
        return this.fb.group({
            //menuComboText: [''],
            partnerContactType: ['', Validators.required],
            partnerCountryCode: ['', Validators.required],
            partnerAreaCode: [''],
            partnerMobileNetworkCode: [''],
            partnerContactNumber: ['', Validators.required]
            //menuCombo: ['', Validators.required]
        })
    }

    // Add New ComboBox to an array()
    addPartnerContact() {
        this.partnerValue.push(this.addPartnerGroup());
    }

    //Getting new ComboBox from array and show in front page
    get partnerValue() {
        return <FormArray>this.contactForm.get('partnerCon');
    }

    //Deleting every comboBox with specific id which is ([formGroupName]="i")
    deletePartner(i) {
        this.partnerValue.removeAt(i);
        //alert(i);
        //alert(this.contactForm.get('menuCombo.areaName'));
        //alert(this.PartnerValue[i]);
    }


    // ppCom
    addPPComGroup() {
        return this.fb.group({
            //menuComboText: [''],
            ppComContactType: ['', Validators.required],
            ppComCountryCode: ['', Validators.required],
            ppComAreaCode: [''],
            ppComMobileNetworkCode: [''],
            ppComContactNumber: ['', Validators.required]
            //menuCombo: ['', Validators.required]
        })
    }

    // Add New ComboBox to an array()
    addPPComContact() {
        this.ppComValue.push(this.addPPComGroup());
    }

    //Getting new ComboBox from array and show in front page
    get ppComValue() {
        return <FormArray>this.contactForm.get('ppCom');
    }

    //Deleting every comboBox with specific id which is ([formGroupName]="i")
    deletePPCom(i) {
        this.ppComValue.removeAt(i);
        //alert(i);
        //alert(this.contactForm.get('menuCombo.areaName'));
        //alert(this.ppComValue[i]);
    }


    // company
    addCompanyGroup() {
        return this.fb.group({
            //menuComboText: [''],
            companyContactType: ['', Validators.required],
            companyCountryCode: ['', Validators.required],
            companyAreaCode: [''],
            companyMobileNetworkCode: [''],
            companyContactNumber: ['', Validators.required]
            //menuCombo: ['', Validators.required]
        })
    }

    // Add New ComboBox to an array()
    addCompanyContact() {
        this.companyValue.push(this.addCompanyGroup());
    }

    //Getting new ComboBox from array and show in front page
    get companyValue() {
        return <FormArray>this.contactForm.get('company');
    }

    //Deleting every comboBox with specific id which is ([formGroupName]="i")
    deleteCompany(i) {
        this.companyValue.removeAt(i);
        //alert(i);
        //alert(this.contactForm.get('menuCombo.areaName'));
        // //alert(this.companyesValue[i]);
    }

}
