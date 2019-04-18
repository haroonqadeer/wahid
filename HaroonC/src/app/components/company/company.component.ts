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
    //telephone: string;
    //mobile: string;
    //email: string;
    //address: string;
    role: string;
    date: Date;
    share: string;
    position: string;
    addressList: adresList[];
    contactList: cntctList[];
    emailList: emailList[];

}

export interface adresList {
    addressType: string;
    address: string,
    countryCode: string,
    provinceCode: string,
    districtCode: string,
    cityCode: string
}


export interface cntctList {
    contactType: string,
    countryCode: string,
    contactCode: string,
    areaCode: boolean,
    mobileCode: boolean,
    contactNumber: string
}


export interface emailList {
    type: string;
    email: string;
}

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {



    // public contactFormSole: FormGroup;
    // public contactFormPartner: FormGroup;
    // public contactFormPPCom: FormGroup;
    // public contactFormCompany: FormGroup;

    // areaCode = false;
    // mobileNetworkCode = false;
    // soleBox = true;
    // partnerBox = true;
    // ppComBox = true;

    companyBox = true;


    serverUrl = "https://localhost:7007/";
    tokenKey = "token";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    // list variables -----------
    excelDataList = [];

    countryListForAddress;
    provinceList;
    districtList;
    cityList;

    //*--For Business--// 
    contactType;
    country;
    area;
    network;
    addressType;
    emailType;
    //*--For Partner--// 
    pContactType;
    pCountry;
    pArea;
    pNetwork;
    pAddressType;
    pEmailType;
    //*--For Board of Directors--// 
    bdContactType;
    bdCountry;
    bdArea;
    bdNetwork;
    bdAddressType;
    bdEmailType;
    //*--For Owner--// 
    oContactType;
    oCountry;
    oArea;
    oNetwork;
    oAddressType;
    oEmailType;

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
    btnStpr2 = false;

    //* variables for pagination and orderby pipe
    p = 1;
    order = 'info.name';
    reverse = false;
    sortedCollection: any[];
    itemPerPage = '10';

    //* Type combo box  (Business types)
    types = [
        { BusinessTypeCd: 1, BusinessTypeName: 'Sole Proprietorship' },
        { BusinessTypeCd: 2, BusinessTypeName: 'Partnership' },
        { BusinessTypeCd: 3, BusinessTypeName: 'Public Company' },
    ];


    //*----------------For Partner Starts---------------//
    //contact Detail partner
    pContactDetail = [
        {
            pContactType: "",
            pCountryCode: "countryCode",
            pContactCode: "",
            pAreaCode: true,
            pMobileCode: false,
            pContactNumber: ""
        }
    ];

    //address Detail partner
    pAddressDetail = [
        {
            pAddressType: "",
            pAddress: ""
        }
    ];

    //Emails Detail partner
    pEmailDetail = [
        {
            pType: "",
            pEmail: ""
        }
    ];

    //*----------------For Partner Ends---------------//




    //*----------------For Board of Directors Starts---------------//
    //contact Detail Board of Directors
    bdContactDetail = [
        {
            bdContactType: "",
            bdCountryCode: "countryCode",
            bdContactCode: "",
            bdAreaCode: true,
            bdMobileCode: false,
            bdContactNumber: ""
        }
    ];

    //address Detail Board of Directors
    bdAddressDetail = [
        {
            bdAddressType: "",
            bdAddress: ""
        }
    ];

    //Emails Detail Board of Directors
    bdEmailDetail = [
        {
            bdType: "",
            bdEmail: ""
        }
    ];

    //*----------------For Board of Directors Ends---------------//




    //*----------------For Owner Starts---------------//
    //contact Detail Owner
    oContactDetail = [
        {
            contactType: "",
            countryCode: "",
            contactCode: "",
            areaCode: true,
            mobileCode: false,
            contactNumber: ""
        }
    ];

    //address Detail Owner
    oAddressDetail = [
        {
            addressType: "",
            address: "",
            countryCode: "",
            provinceCode: "",
            districtCode: "",
            cityCode: ""
        }
    ];

    //Emails Detail Owner
    oEmailDetail = [
        {
            type: "",
            email: ""
        }
    ];

    //*----------------For Owner Ends---------------//





    //*----------------For Business Starts---------------//
    //contact Detail Business
    contactDetail = [
        {
            contactType: "",
            countryCode: "",
            contactCode: "",
            areaCode: true,
            mobileCode: false,
            contactNumber: ""
        }
    ];

    //address Detail Business
    // addressDetail = [
    //     {
    //         addressType: "",
    //         address: "",
    //         countryCode: "",
    //         provinceCode: "",
    //         districtCode: "",
    //         cityCode: ""
    //     }
    // ];

    addressDetail: Array<adresList> = [];

    //Emails Detail Business
    emailDetail = [
        {
            type: "",
            email: ""
        }
    ];
    //*----------------For Business Ends---------------//

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
        private fb: FormBuilder) {

        this.contactType = [
            { label: 'Fax', value: 'Fax' },
            { label: 'Telephone', value: 'Telephone' },
            { label: 'Mobile', value: 'Mobile' },
        ];

        //Country Code for Mobiles
        this.country = [
            { label: "Pakistan +92", value: "+92" },
            { label: "Turkey +90", value: "+90" },
            { label: "US +1", value: "+1" }
        ];

        //Area Code
        this.area = [
            { label: 51, areaName: "Islamabad", value: "51" },
            { label: 21, areaName: "Karachi", value: "21" },
            { label: 42, areaName: "Lahore", value: "42" }
        ];

        //Mobile Code
        this.network = [
            { label: 300, networkName: "Jazz", value: "300" },
            { label: 313, networkName: "Zong", value: "313" },
            { label: 345, networkName: "Telenor", value: "345" },
            { label: 333, networkName: "Ufone", value: "333" }
        ];

        //Address Types
        this.addressType = [
            { label: 'Current Address', value: 'Current Address' },
            { label: 'Office Address', value: 'Office Address' },
            { label: 'Postal Address', value: 'Postal Address' }
        ];

        //Email Types
        this.emailType = [
            { label: 'Personal Email', value: 'Personal Email' },
            { label: 'Office Email', value: 'Office Email' }
        ];

        //* For partner ----------------------------------------//
        this.pContactType = [
            { label: 'Fax', value: 'Fax' },
            { label: 'Telephone', value: 'Telephone' },
            { label: 'Mobile', value: 'Mobile' },
        ];

        //Country Code
        this.pCountry = [
            { label: "Pakistan +92", value: "+92" },
            { label: "Turkey +90", value: "+90" },
            { label: "US +1", value: "+1" }
        ];

        //Area Code
        this.pArea = [
            { label: 51, areaName: "Islamabad", value: "51" },
            { label: 21, areaName: "Karachi", value: "21" },
            { label: 42, areaName: "Lahore", value: "42" }
        ];

        //Mobile Code
        this.pNetwork = [
            { label: 300, networkName: "Jazz", value: "300" },
            { label: 313, networkName: "Zong", value: "313" },
            { label: 345, networkName: "Telenor", value: "345" },
            { label: 333, networkName: "Ufone", value: "333" }
        ];

        //Address Types
        this.pAddressType = [
            { label: 'Current Address', value: 'Current Address' },
            { label: 'Office Address', value: 'Office Address' },
            { label: 'Postal Address', value: 'Postal Address' }
        ];

        //Email Types
        this.pEmailType = [
            { label: 'Personal Email', value: 'Personal Email' },
            { label: 'Office Email', value: 'Office Email' }
        ];

        //* For BOD ----------------------------------------//
        this.bdContactType = [
            { label: 'Fax', value: 'Fax' },
            { label: 'Telephone', value: 'Telephone' },
            { label: 'Mobile', value: 'Mobile' },
        ];

        //Country Code
        this.bdCountry = [
            { label: "Pakistan +92", value: "+92" },
            { label: "Turkey +90", value: "+90" },
            { label: "US +1", value: "+1" }
        ];

        //Area Code
        this.bdArea = [
            { label: 51, areaName: "Islamabad", value: "51" },
            { label: 21, areaName: "Karachi", value: "21" },
            { label: 42, areaName: "Lahore", value: "42" }
        ];

        //Mobile Code
        this.bdNetwork = [
            { label: 300, networkName: "Jazz", value: "300" },
            { label: 313, networkName: "Zong", value: "313" },
            { label: 345, networkName: "Telenor", value: "345" },
            { label: 333, networkName: "Ufone", value: "333" }
        ];

        //Address Types
        this.bdAddressType = [
            { label: 'Current Address', value: 'Current Address' },
            { label: 'Office Address', value: 'Office Address' },
            { label: 'Postal Address', value: 'Postal Address' }
        ];

        //Email Types
        this.bdEmailType = [
            { label: 'Personal Email', value: 'Personal Email' },
            { label: 'Office Email', value: 'Office Email' }
        ];

        //* For Owner ----------------------------------------//
        this.oContactType = [
            { label: 'Fax', value: 'Fax' },
            { label: 'Telephone', value: 'Telephone' },
            { label: 'Mobile', value: 'Mobile' },
        ];

        //Country Code
        this.oCountry = [
            { label: "Pakistan +92", value: "+92" },
            { label: "Turkey +90", value: "+90" },
            { label: "US +1", value: "+1" }
        ];

        //Area Code
        this.oArea = [
            { label: 51, areaName: "Islamabad", value: "51" },
            { label: 21, areaName: "Karachi", value: "21" },
            { label: 42, areaName: "Lahore", value: "42" }
        ];

        //Mobile Code
        this.oNetwork = [
            { label: 300, networkName: "Jazz", value: "300" },
            { label: 313, networkName: "Zong", value: "313" },
            { label: 345, networkName: "Telenor", value: "345" },
            { label: 333, networkName: "Ufone", value: "333" }
        ];

        //Address Types
        this.oAddressType = [
            { label: 'Current Address', value: 'Current Address' },
            { label: 'Office Address', value: 'Office Address' },
            { label: 'Postal Address', value: 'Postal Address' }
        ];

        //Email Types
        this.oEmailType = [
            { label: 'Personal Email', value: 'Personal Email' },
            { label: 'Office Email', value: 'Office Email' }
        ];

    }

    ngOnInit() {

        //*countrys list for address
        this.countryListForAddress = [
            { label: "Pakistan +92", value: "+92" },
            { label: "Turkey +90", value: "+90" },
            { label: "US +1", value: "+1" }
        ];

        //*province List
        this.provinceList = [
            { label: "Balochistan", value: "7" },
            { label: "Khyber Pakhtunkhwa", value: "2" },
            { label: "Punjab", value: "6" },
            { label: "Sindh", value: "8" }
        ];

        //*district List
        this.districtList = [
            { label: "Rawalpindi", value: "1" },
            { label: "Lahore", value: "2" },
            { label: "Peshawar", value: "3" },
            { label: "Karachi", value: "4" },
            { label: "Hyderabad", value: "5" },
            { label: "Quetta", value: "6" }
        ];

        //*city List 
        this.cityList = [
            { label: "Rawalpindi", value: "1" },
            { label: "Gujerkhan", value: "2" },
            { label: "Kahuta", value: "6" },
            { label: "Karachi", value: "8" },
            { label: "Lahore", value: "8" },
            { label: "Quetta", value: "8" },
            { label: "Peshawar", value: "8" },
            { label: "Merdan", value: "8" },
            { label: "Noshera", value: "8" }
        ];

    }

    @ViewChild("excelDataContent") public excelDataContent: IgxGridComponent;//For excel
    @ViewChild("exportPDF") public exportPDF: ElementRef;//for pdf


    //* Function for save and update company 
    save() {

        if (this.cmbCType == '') {
            this.toastr.errorToastr('Please select business type', 'Error', { toastTimeout: (2500) });
            return false;
        }

        // //*----- For Business ------//
        // else if (this.bNtn == '' || this.bNtn.length < 8) {
        //     this.toastr.errorToastr('Please enter business ntn', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.bStrn == '' || this.bStrn.length < 10) {
        //     this.toastr.errorToastr('Please enter business strn', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.bTitle == '') {
        //     this.toastr.errorToastr('Please enter business title', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.bNature == '') {
        //     this.toastr.errorToastr('Please enter business nature', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.bDescription == '') {
        //     this.toastr.errorToastr('Please enter business description', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.bWebsite == '') {
        //     this.toastr.errorToastr('Please enter business website', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.bFacebook == '') {
        //     this.toastr.errorToastr('Please enter facebook link', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.addressDetail.length == 0) {
        //     this.toastr.errorToastr('Please Add Business Address Info', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.contactDetail.length == 0) {
        //     this.toastr.errorToastr('Please Add Business Contact Info Type', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.emailDetail.length == 0) {
        //     this.toastr.errorToastr('Please Add Business Email Info', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }

        // //*----- For Owner ------//
        // else if (this.solePro == true && (this.sCnic == '' || this.sCnic.length < 13)) {
        //     this.toastr.errorToastr('Please enter owner CNIC', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.solePro == true && (this.sNtn == '' || this.sNtn.length < 8)) {
        //     this.toastr.errorToastr('Please enter owner NTN', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.solePro == true && this.sOwnerName == '') {
        //     this.toastr.errorToastr('Please enter owner name', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.solePro == true && this.oAddressDetail.length == 0) {
        //     this.toastr.errorToastr('Please Add Owner Address Info', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.solePro == true && this.oContactDetail.length == 0) {
        //     this.toastr.errorToastr('Please Add Owner Contact Info Type', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.solePro == true && this.oEmailDetail.length == 0) {
        //     this.toastr.errorToastr('Please Add Owner Email Info', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }

        // //*----- For Partner ------//
        // else if (this.partner == true && (this.partners.length == undefined || this.partners.length < 1)) {
        //     this.toastr.errorToastr('Please enter partner information', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }

        // //*----- For Board of Directors ------//
        // else if (this.ppCom == true && (this.ppCnic == '' || this.ppCnic.length < 13)) {
        //     this.toastr.errorToastr('Please enter director cnic', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.ppCom == true && (this.ppNtn == '' || this.ppNtn.length < 8)) {
        //     this.toastr.errorToastr('Please enter director ntn', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.ppCom == true && this.ppDirectorName == '') {
        //     this.toastr.errorToastr('Please enter director name', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.ppCom == true && this.ppPosition == '') {
        //     this.toastr.errorToastr('Please enter director position', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.ppCom == true && this.ppShare == '') {
        //     this.toastr.errorToastr('Please enter director share', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.ppCom == true && this.bdAddressDetail.length == 0) {
        //     this.toastr.errorToastr('Please Add BOD Address Info', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.ppCom == true && this.bdContactDetail.length == 0) {
        //     this.toastr.errorToastr('Please Add BOD Contact Info', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }
        // else if (this.ppCom == true && this.bdEmailDetail.length == 0) {
        //     this.toastr.errorToastr('Please Add BOD Email Info', 'Error', { toastTimeout: (2500) });
        //     return false;
        // }

        else {

            //* For Business Info ****************************************************************

            // // address type conditions
            // if (this.addressDetail.length > 0) {
            //     for (let i = 0; i < this.addressDetail.length; i++) {
            //         if (this.addressDetail[i].addressType.trim() == "") {
            //             this.toastr.errorToastr('Please Select Business Address Type', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.addressDetail[i].address.trim() == "") {
            //             this.toastr.errorToastr('Please Enter Business Address', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //     }
            // }


            // // contact type conditions
            // if (this.contactDetail.length > 0) {
            //     for (let i = 0; i < this.contactDetail.length; i++) {
            //         if (this.contactDetail[i].contactType.trim() == "") {
            //             this.toastr.errorToastr('Please Select Business Contact Type', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.contactDetail[i].countryCode.trim() == "countryCode") {
            //             this.toastr.errorToastr('Please Select Business Country Code', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.contactDetail[i].contactCode.trim() == "") {
            //             this.toastr.errorToastr('Please Select Business Contact Code', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.contactDetail[i].contactNumber.trim() == "") {
            //             this.toastr.errorToastr('Please Enter Business Contact Number', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //     }
            // }


            // // email type conditions
            // if (this.emailDetail.length > 0) {
            //     for (let i = 0; i < this.emailDetail.length; i++) {
            //         if (this.emailDetail[i].type.trim() == "") {
            //             this.toastr.errorToastr('Please Select Business Email Type', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.emailDetail[i].email.trim() == "") {
            //             this.toastr.errorToastr('Please Enter Business Email', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.isEmail(this.emailDetail[i].email.trim()) == false) {
            //             this.toastr.errorToastr('Invalid Business email', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //     }
            // }

            // //* For Owner Info ***********************************************************************
            // // address type conditions
            // if (this.solePro == true && this.oAddressDetail.length > 0) {
            //     for (let i = 0; i < this.oAddressDetail.length; i++) {
            //         if (this.oAddressDetail[i].addressType.trim() == "") {
            //             this.toastr.errorToastr('Please enter complete owner address detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.oAddressDetail[i].address.trim() == "") {
            //             this.toastr.errorToastr('Please enter complete owner address detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.oAddressDetail[i].countryCode == "") {
            //             this.toastr.errorToastr('Please enter complete owner address detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.oAddressDetail[i].provinceCode == "") {
            //             this.toastr.errorToastr('Please enter complete owner address detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.oAddressDetail[i].districtCode == "") {
            //             this.toastr.errorToastr('Please enter complete owner address detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.oAddressDetail[i].cityCode == "") {
            //             this.toastr.errorToastr('Please enter complete owner address detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //     }
            // }
            // // contact type conditions
            // if (this.solePro == true && this.oContactDetail.length > 0) {
            //     for (let i = 0; i < this.oContactDetail.length; i++) {
            //         if (this.oContactDetail[i].contactType.trim() == "") {
            //             this.toastr.errorToastr('Please enter complete owner contact detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.oContactDetail[i].countryCode.trim() == "countryCode") {
            //             this.toastr.errorToastr('Please enter complete owner contact detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.oContactDetail[i].contactCode.trim() == "") {
            //             this.toastr.errorToastr('Please enter complete owner contact detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.oContactDetail[i].contactNumber.trim() == "") {
            //             this.toastr.errorToastr('Please enter complete owner contact detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //     }
            // }
            // // email type conditions
            // if (this.solePro == true && this.oEmailDetail.length > 0) {
            //     for (let i = 0; i < this.oEmailDetail.length; i++) {
            //         if (this.oEmailDetail[i].type.trim() == "") {
            //             this.toastr.errorToastr('Please enter complete owner email detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.oEmailDetail[i].email.trim() == "") {
            //             this.toastr.errorToastr('Please enter complete owner email detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.isEmail(this.oEmailDetail[i].email.trim()) == false) {
            //             this.toastr.errorToastr('Invalid Owner email detail', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //     }
            // }


            // //* For Board of Directors****************************************************************
            // // address type conditions
            // if (this.ppCom == true && this.bdAddressDetail.length > 0) {
            //     for (let i = 0; i < this.bdAddressDetail.length; i++) {
            //         if (this.bdAddressDetail[i].bdAddressType.trim() == "") {
            //             this.toastr.errorToastr('Please Select BOD Address Type', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.bdAddressDetail[i].bdAddress.trim() == "") {
            //             this.toastr.errorToastr('Please Enter BOD Address', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //     }
            // }

            // // contact type conditions
            // if (this.ppCom == true && this.bdContactDetail.length > 0) {
            //     for (let i = 0; i < this.bdContactDetail.length; i++) {
            //         if (this.bdContactDetail[i].bdContactType.trim() == "") {
            //             this.toastr.errorToastr('Please Select BOD Contact Type', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.bdContactDetail[i].bdCountryCode.trim() == "countryCode") {
            //             this.toastr.errorToastr('Please Select BOD Country Code', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.bdContactDetail[i].bdContactCode.trim() == "") {
            //             this.toastr.errorToastr('Please Select BOD Contact Code', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.bdContactDetail[i].bdContactNumber.trim() == "") {
            //             this.toastr.errorToastr('Please Enter BOD Contact Number', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //     }
            // }

            // // email type conditions
            // if (this.ppCom == true && this.bdEmailDetail.length > 0) {
            //     for (let i = 0; i < this.bdEmailDetail.length; i++) {
            //         if (this.bdEmailDetail[i].bdType.trim() == "") {
            //             this.toastr.errorToastr('Please Select BOD Email Type', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.bdEmailDetail[i].bdEmail.trim() == "") {
            //             this.toastr.errorToastr('Please Enter BOD Email', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //         else if (this.isEmail(this.bdEmailDetail[i].bdEmail.trim()) == false) {
            //             this.toastr.errorToastr('Invalid BOD email', 'Error', { toastTimeout: (2500) });
            //             return false;
            //         }
            //     }
            // }

            //--------------------------------------------//

            // if (this.cmbCType == "Sole Proprietorship") {
            //     this.partners = [];
            //     this.clearPartner();

            //     this.partners.push({
            //         cnic: this.sCnic,
            //         ntn: this.sNtn,
            //         name: this.sOwnerName,
            //         role: null,
            //         date: null,
            //         share: null,
            //         position: null,
            //         addressList: this.oAddressDetail,
            //         contactList: this.oContactDetail,
            //         emailList: this.oEmailDetail
            //     });
            // }
            // else if (this.cmbCType == "Public Limited Company" || this.cmbCType == "Private Limited Company") {
            //     this.partners = [];
            //     this.clearPartner();

            //     this.partners.push({
            //         cnic: this.ppCnic,
            //         ntn: this.ppNtn,
            //         name: this.ppDirectorName,
            //         role: null,
            //         date: null,
            //         share: this.ppShare,
            //         position: this.ppPosition,
            //         addressList: this.oAddressDetail,
            //         contactList: this.oContactDetail,
            //         emailList: this.oEmailDetail
            //     });
            // }




            if (this.companyId != '') {
                this.app.showSpinner();
                this.toastr.successToastr('update successfully', 'Success', { toastTimeout: (2500) });
                //this.clear(this.companyId);
                this.clear(1);
                // this.clearPartner();
                // this.clearBoardDirectors();
                // this.clearOwner();
                $('#companyModal').modal('hide');
                this.app.hideSpinner();
                return false;

                var updateData = { "Password": this.txtdPassword, "PIN": this.txtdPin };

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

                // this.toastr.successToastr('validation complete information', 'Success!', { toastTimeout: (2500) });
                // return false;
            }
            else {
                this.app.showSpinner();

                //$('#companyModal').modal('hide');
                //this.app.hideSpinner();
                //return false;

                var saveData = {
                    "companyTitle": this.bTitle,
                    "businessType": Number(this.cmbCType),
                    "companyNtn": this.bNtn,
                    "companyStrn": this.bStrn,
                    "companyNature": this.bNature
                    // companyDesc: this.bDescription,
                    // website: this.bWebsite,
                    // fbId: this.bFacebook,
                    // address: JSON.stringify(this.addressDetail),
                    // telephone: JSON.stringify(this.contactDetail),
                    // email: JSON.stringify(this.emailDetail),
                    //partners: this.partners
                };

                alert(saveData.companyStrn);

                // var token = localStorage.getItem(this.tokenKey);

                // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

                // this.http.post(this.serverUrl + 'api/saveCompany', saveData, { headers: reqHeader }).subscribe((data: any) => {
                this.http.post(this.serverUrl + 'api/saveCompany', { address: JSON.stringify(this.addressDetail), telephone: JSON.stringify(this.contactDetail) }, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record Saved Successfully', 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }

                });


            }
        }
    }


    //* Function for add new partner for company 
    addPartner() {
        //return false;
        if (this.pCnic == '' || this.pCnic.length < 13) {
            this.toastr.errorToastr('Please enter partner CNIC', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.pNtn == '' || this.pNtn.length < 8) {
            this.toastr.errorToastr('Please enter partner NTN', 'Error', { toastTimeout: (2500) });
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
            this.toastr.errorToastr('Please enter partner date', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.pShare == '') {
            this.toastr.errorToastr('Please enter partner share', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // address type conditions
        else if (this.pAddressDetail.length == 0) {
            this.toastr.errorToastr('Please Add partner Address Info', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // contact type conditions
        else if (this.pContactDetail.length == 0) {
            this.toastr.errorToastr('Please Add partner Contact Info Type', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // email type conditions
        else if (this.pEmailDetail.length == 0) {
            this.toastr.errorToastr('Please Add partner Email Info', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else {

            // address type conditions
            if (this.pAddressDetail.length > 0) {
                for (let i = 0; i < this.pAddressDetail.length; i++) {
                    if (this.pAddressDetail[i].pAddressType.trim() == "") {
                        this.toastr.errorToastr('Please Select partner Address Type', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.pAddressDetail[i].pAddress.trim() == "") {
                        this.toastr.errorToastr('Please Enter partner Address', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                }
            }
            // contact type conditions
            if (this.pContactDetail.length > 0) {
                for (let i = 0; i < this.pContactDetail.length; i++) {
                    if (this.pContactDetail[i].pContactType.trim() == "") {
                        this.toastr.errorToastr('Please Select partner Contact Type', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.pContactDetail[i].pCountryCode.trim() == "countryCode") {
                        this.toastr.errorToastr('Please Select partner Country Code', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.pContactDetail[i].pContactCode.trim() == "") {
                        this.toastr.errorToastr('Please Select partner Contact Code', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.pContactDetail[i].pContactNumber.trim() == "") {
                        this.toastr.errorToastr('Please Enter partner Contact Number', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                }
            }
            // email type conditions
            if (this.pEmailDetail.length > 0) {
                for (let i = 0; i < this.pEmailDetail.length; i++) {
                    if (this.pEmailDetail[i].pType.trim() == "") {
                        this.toastr.errorToastr('Please Select partner Email Type', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.pEmailDetail[i].pEmail.trim() == "") {
                        this.toastr.errorToastr('Please Enter partner Email', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.isEmail(this.pEmailDetail[i].pEmail.trim()) == false) {
                        this.toastr.errorToastr('Invalid partner email', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                }
            }

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
                    role: this.pPartnerRole,
                    date: new Date(this.pDate),
                    share: this.pShare,
                    position: null,
                    addressList: null,
                    contactList: null,
                    emailList: null
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
        // this.pTelephone = '';
        // this.pMobile = '';
        // this.pEmail = '';
        // this.pAddress = '';
        //contact Detail partner

        this.pContactDetail = [
            {
                pContactType: "",
                pCountryCode: "countryCode",
                pContactCode: "",
                pAreaCode: true,
                pMobileCode: false,
                pContactNumber: ""
            }
        ];

        //address Detail partner
        this.pAddressDetail = [
            {
                pAddressType: "",
                pAddress: ""
            }
        ];

        //Emails Detail partner
        this.pEmailDetail = [
            {
                pType: "",
                pEmail: ""
            }
        ];

        // this.contactFormPartner.reset();

    }

    //* Function for empty all fields of Owner information 
    clearOwner() {

        //contact Detail Owner
        this.oContactDetail = [
            {
                contactType: "",
                countryCode: "countryCode",
                contactCode: "",
                areaCode: true,
                mobileCode: false,
                contactNumber: ""
            }
        ];

        //address Detail Owner
        this.oAddressDetail = [
            {
                addressType: "",
                address: "",
                countryCode: "",
                provinceCode: "",
                districtCode: "",
                cityCode: ""
            }
        ];

        //Emails Detail Owner
        this.oEmailDetail = [
            {
                type: "",
                email: ""
            }
        ];

    }

    //* Function for empty all fields of Board of Directors information 
    clearBoardDirectors() {

        //contact Detail Board of Directors
        this.bdContactDetail = [
            {
                bdContactType: "",
                bdCountryCode: "countryCode",
                bdContactCode: "",
                bdAreaCode: true,
                bdMobileCode: false,
                bdContactNumber: ""
            }
        ];

        //address Detail Board of Directors
        this.bdAddressDetail = [
            {
                bdAddressType: "",
                bdAddress: ""
            }
        ];

        //Emails Detail Board of Directors
        this.bdEmailDetail = [
            {
                bdType: "",
                bdEmail: ""
            }
        ];

        // this.contactFormPartner.reset();

    }


    //function for empty all fields
    clear(cId) {

        if (cId > 0) {

            this.ppCom = false;
            this.partner = false;
            this.solePro = false;

            this.btnStpr1 = false;
            this.btnStpr2 = false;
            this.cmbCType = '';

            this.sCnic = '';
            this.sNtn = '';
            this.sOwnerName = '';
            //this.sTelephoneNo = '';
            //this.sMobileNo = '';
            //this.sEmail = '';
            //this.sAddress = '';

            this.clearPartner();
            this.clearBoardDirectors();
            this.clearOwner();

            this.ppCnic = '';
            this.ppNtn = '';
            this.ppDirectorName = '';
            this.ppPosition = '';
            this.ppShare = '';
            // this.ppTelephone = '';
            // this.ppMobile = '';
            // this.ppEmail = '';
            // this.ppAddress = '';

            this.bNtn = '';
            this.bStrn = '';
            this.bTitle = '';
            this.bNature = '';
            this.bDescription = '';
            // this.bBusinessAddress = '';
            // this.bMailingAddress = '';
            // this.bTelephone = '';
            // this.bMobile = '';
            // this.bEmail = '';
            this.bWebsite = '';
            this.bFacebook = '';

            // this.contactFormSole.reset();
            // this.contactFormPPCom.reset();
            // this.contactFormCompany.reset();

            this.txtdPassword = '';
            this.txtdPin = '';
            this.dCompanyId = '';

            this.addressDetail = [
                {
                    addressType: "",
                    address: "",
                    countryCode: "",
                    provinceCode: "",
                    districtCode: "",
                    cityCode: ""
                }
            ];

            this.contactDetail = [
                {
                    contactType: "",
                    countryCode: "countryCode",
                    contactCode: "",
                    areaCode: true,
                    mobileCode: false,
                    contactNumber: ""
                }
            ];

            this.emailDetail = [
                {
                    type: "",
                    email: ""
                }
            ];

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
        else if (this.cmbCType == '1') {
            this.solePro = true;
            this.partner = false;
            this.ppCom = false;
        }
        else if (this.cmbCType == '2') {
            this.partner = true;
            this.solePro = false;
            this.ppCom = false;
        }
        else if (this.cmbCType == '3') {
            this.ppCom = true;
            this.partner = false;
            this.solePro = false;
        }

        if (this.cmbCType != '') {
            this.btnStpr1 = true;
        }
    }


    // checkBusinessInfo() {
    //     if (this.bNtn == '' || this.bNtn.length < 8) {
    //         this.toastr.errorToastr('Please enter business ntn', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else if (this.bStrn == '' || this.bStrn.length < 10) {
    //         this.toastr.errorToastr('Please enter business strn', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else if (this.bTitle == '') {
    //         this.toastr.errorToastr('Please enter business title', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else if (this.bNature == '') {
    //         this.toastr.errorToastr('Please enter business nature', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else if (this.bDescription == '') {
    //         this.toastr.errorToastr('Please enter description', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }

    //     else if (this.bWebsite == '') {
    //         this.toastr.errorToastr('Please enter website', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else if (this.bFacebook == '') {
    //         this.toastr.errorToastr('Please enter facebook link', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     // address type conditions
    //     else if (this.addressDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Address Info', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     // contact type conditions
    //     else if (this.contactDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Contact Info Type', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     // email type conditions
    //     else if (this.emailDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Email Info', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else {
    //         // address type conditions
    //         if (this.addressDetail.length > 0) {
    //             for (let i = 0; i < this.addressDetail.length; i++) {
    //                 if (this.addressDetail[i].addressType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Address Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.addressDetail[i].address.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Address', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //         // contact type conditions
    //         if (this.contactDetail.length > 0) {
    //             for (let i = 0; i < this.contactDetail.length; i++) {
    //                 if (this.contactDetail[i].contactType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.contactDetail[i].countryCode.trim() == "countryCode") {
    //                     this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.contactDetail[i].contactCode.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Contact Code', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.contactDetail[i].contactNumber.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Contact Number', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //         // email type conditions
    //         if (this.emailDetail.length > 0) {
    //             for (let i = 0; i < this.emailDetail.length; i++) {
    //                 if (this.emailDetail[i].type.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Email Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.emailDetail[i].email.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Email', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.isEmail(this.emailDetail[i].email.trim()) == false) {
    //                     this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //             this.btnStpr2 = true;
    //         }

    //         this.btnStpr2 = true;

    //         // if (this.cmbCType != '') {
    //         //     this.btnStpr2 = true;
    //         // }

    //         //this.clearPartner();

    //         // else {
    //         //     this.btnStpr2 = true;
    //         // }
    //     }
    // }

    // checkOwnerInfo() {
    //     if (this.oAddressDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Address Info', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     // contact type conditions
    //     else if (this.oContactDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Contact Info Type', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     // email type conditions
    //     else if (this.oEmailDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Email Info', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }

    //     else {

    //         // address type conditions
    //         if (this.oAddressDetail.length > 0) {
    //             for (let i = 0; i < this.oAddressDetail.length; i++) {
    //                 if (this.oAddressDetail[i].oAddressType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Address Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.oAddressDetail[i].oAddress.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Address', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //         // contact type conditions
    //         if (this.oContactDetail.length > 0) {
    //             for (let i = 0; i < this.oContactDetail.length; i++) {
    //                 if (this.oContactDetail[i].oContactType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.oContactDetail[i].oCountryCode.trim() == "countryCode") {
    //                     this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.oContactDetail[i].oContactCode.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Contact Code', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.oContactDetail[i].oContactNumber.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Contact Number', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //         // email type conditions
    //         if (this.oEmailDetail.length > 0) {
    //             for (let i = 0; i < this.oEmailDetail.length; i++) {
    //                 if (this.oEmailDetail[i].oType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Email Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.oEmailDetail[i].oEmail.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Email', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.isEmail(this.oEmailDetail[i].oEmail.trim()) == false) {
    //                     this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //     }
    // }

    // checkBODInfo() {
    //     if (this.bdAddressDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Address Info', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     // contact type conditions
    //     else if (this.bdContactDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Contact Info Type', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     // email type conditions
    //     else if (this.bdEmailDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Email Info', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }

    //     else {

    //         // address type conditions
    //         if (this.bdAddressDetail.length > 0) {
    //             for (let i = 0; i < this.bdAddressDetail.length; i++) {
    //                 if (this.bdAddressDetail[i].bdAddressType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Address Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.bdAddressDetail[i].bdAddress.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Address', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //         // contact type conditions
    //         if (this.bdContactDetail.length > 0) {
    //             for (let i = 0; i < this.bdContactDetail.length; i++) {
    //                 if (this.bdContactDetail[i].bdContactType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.bdContactDetail[i].bdCountryCode.trim() == "countryCode") {
    //                     this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.bdContactDetail[i].bdContactCode.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Contact Code', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.bdContactDetail[i].bdContactNumber.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Contact Number', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //         // email type conditions
    //         if (this.bdEmailDetail.length > 0) {
    //             for (let i = 0; i < this.bdEmailDetail.length; i++) {
    //                 if (this.bdEmailDetail[i].bdType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Email Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.bdEmailDetail[i].bdEmail.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Email', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.isEmail(this.bdEmailDetail[i].bdEmail.trim()) == false) {
    //                     this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //     }
    // }

    // checkPartnerInfo() {
    //     if (this.pCnic == '' || this.pCnic.length < 13) {
    //         this.toastr.errorToastr('Please enter CNIC', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else if (this.pNtn == '' || this.pNtn.length < 8) {
    //         this.toastr.errorToastr('Please enter NTN', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else if (this.pPartnerName == '') {
    //         this.toastr.errorToastr('Please enter partner name', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else if (this.pPartnerRole == '') {
    //         this.toastr.errorToastr('Please enter partner role', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else if (this.pDate == '') {
    //         this.toastr.errorToastr('Please enter date', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else if (this.pShare == '') {
    //         this.toastr.errorToastr('Please enter share', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     // address type conditions
    //     else if (this.pAddressDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Address Info', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     // contact type conditions
    //     else if (this.pContactDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Contact Info Type', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     // email type conditions
    //     else if (this.pEmailDetail.length == 0) {
    //         this.toastr.errorToastr('Please Add Email Info', 'Error', { toastTimeout: (2500) });
    //         return false;
    //     }
    //     else {

    //         // address type conditions
    //         if (this.pAddressDetail.length > 0) {
    //             for (let i = 0; i < this.pAddressDetail.length; i++) {
    //                 if (this.pAddressDetail[i].pAddressType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Address Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.pAddressDetail[i].pAddress.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Address', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //         // contact type conditions
    //         if (this.pContactDetail.length > 0) {
    //             for (let i = 0; i < this.pContactDetail.length; i++) {
    //                 if (this.pContactDetail[i].pContactType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.pContactDetail[i].pCountryCode.trim() == "countryCode") {
    //                     this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.pContactDetail[i].pContactCode.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Contact Code', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.pContactDetail[i].pContactNumber.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Contact Number', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //         // email type conditions
    //         if (this.pEmailDetail.length > 0) {
    //             for (let i = 0; i < this.pEmailDetail.length; i++) {
    //                 if (this.pEmailDetail[i].pType.trim() == "") {
    //                     this.toastr.errorToastr('Please Select Email Type', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.pEmailDetail[i].pEmail.trim() == "") {
    //                     this.toastr.errorToastr('Please Enter Email', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //                 else if (this.isEmail(this.pEmailDetail[i].pEmail.trim()) == false) {
    //                     this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
    //                     return false;
    //                 }
    //             }
    //         }
    //     }
    // }

    //*----------------For Partner Starts---------------//

    pOnContactChange(pContactType, item) {

        if (pContactType == "Fax") {
            item.pAreaCode = true;
            item.pMobileCode = false;
        }
        else if (pContactType == "Telephone") {
            item.pAreaCode = true;
            item.pMobileCode = false;
        }
        else if (pContactType == "Mobile") {
            item.pAreaCode = false;
            item.pMobileCode = true;
        }
        else {
            return;
        }
    }


    pAddContact() {

        this.pContactDetail.push({
            pContactType: "",
            pCountryCode: "countryCode",
            pContactCode: "",
            pAreaCode: true,
            pMobileCode: false,
            pContactNumber: ""
        });

    }

    pAddAddress() {

        this.pAddressDetail.push({
            pAddressType: "",
            pAddress: ""
        });

    }

    pAddEmail() {

        this.pEmailDetail.push({
            pType: "",
            pEmail: ""
        });

    }

    //Deleting contact row
    pRemoveContact(item) {
        this.pContactDetail.splice(item, 1);
    }

    //Deleting address row
    pRemoveAddress(item) {
        this.pAddressDetail.splice(item, 1);
    }

    //Deleting address row
    pRemoveEmail(item) {
        this.pEmailDetail.splice(item, 1);
    }

    //*----------------For Partner Ends---------------//

    //*----------------For Board of Directors Starts---------------//
    bdOnContactChange(bdContactType, item) {

        if (bdContactType == "Fax") {
            item.bdAreaCode = true;
            item.bdMobileCode = false;
        }
        else if (bdContactType == "Telephone") {
            item.bdAreaCode = true;
            item.bdMobileCode = false;
        }
        else if (bdContactType == "Mobile") {
            item.bdAreaCode = false;
            item.bdMobileCode = true;
        }
        else {
            return;
        }
    }


    bdAddContact() {

        this.bdContactDetail.push({
            bdContactType: "",
            bdCountryCode: "countryCode",
            bdContactCode: "",
            bdAreaCode: true,
            bdMobileCode: false,
            bdContactNumber: ""
        });

    }

    bdAddAddress() {

        this.bdAddressDetail.push({
            bdAddressType: "",
            bdAddress: ""
        });

    }

    bdAddEmail() {

        this.bdEmailDetail.push({
            bdType: "",
            bdEmail: ""
        });

    }

    //Deleting contact row
    bdRemoveContact(item) {
        this.bdContactDetail.splice(item, 1);
    }

    //Deleting address row
    bdRemoveAddress(item) {
        this.bdAddressDetail.splice(item, 1);
    }

    //Deleting address row
    bdRemoveEmail(item) {
        this.bdEmailDetail.splice(item, 1);
    }

    //*----------------For Board of Directors Ends---------------//


    //*----------------For Owner Starts---------------//
    owOnContactChange(oContactType, item) {

        if (oContactType == "Fax") {
            item.oAreaCode = true;
            item.oMobileCode = false;
        }
        else if (oContactType == "Telephone") {
            item.oAreaCode = true;
            item.oMobileCode = false;
        }
        else if (oContactType == "Mobile") {
            item.oAreaCode = false;
            item.oMobileCode = true;
        }
        else {
            return;
        }
    }


    oAddContact() {

        this.oContactDetail.push({
            contactType: "",
            countryCode: "countryCode",
            contactCode: "",
            areaCode: true,
            mobileCode: false,
            contactNumber: ""
        });

    }

    oAddAddress() {

        this.oAddressDetail.push({
            addressType: "",
            address: "",
            countryCode: "",
            provinceCode: "",
            districtCode: "",
            cityCode: ""
        });

    }

    oAddEmail() {

        this.oEmailDetail.push({
            type: "",
            email: ""
        });

    }

    //Deleting contact row
    oRemoveContact(item) {
        this.oContactDetail.splice(item, 1);
    }

    //Deleting address row
    oRemoveAddress(item) {
        this.oAddressDetail.splice(item, 1);
    }

    //Deleting address row
    oRemoveEmail(item) {
        this.oEmailDetail.splice(item, 1);
    }

    //*----------------For Owner Ends---------------//


    //*----------------For Business Starts---------------//
    onContactChange(contactType, item) {

        if (contactType == "Fax") {
            item.areaCode = true;
            item.mobileCode = false;
        }
        else if (contactType == "Telephone") {
            item.areaCode = true;
            item.mobileCode = false;
        }
        else if (contactType == "Mobile") {
            item.areaCode = false;
            item.mobileCode = true;
        }
        else {
            return;
        }
    }


    addContact() {

        this.contactDetail.push({
            contactType: "",
            countryCode: "countryCode",
            contactCode: "",
            areaCode: true,
            mobileCode: false,
            contactNumber: ""
        });

    }

    addAddress() {

        this.addressDetail.push({
            addressType: "",
            address: "",
            countryCode: "",
            provinceCode: "",
            districtCode: "",
            cityCode: ""
        });

    }

    addEmail() {

        this.emailDetail.push({
            type: "",
            email: ""
        });

    }

    //Deleting contact row
    removeContact(item) {
        this.contactDetail.splice(item, 1);
    }

    //Deleting address row
    removeAddress(item) {
        this.addressDetail.splice(item, 1);
    }

    //Deleting address row
    removeEmail(item) {
        this.emailDetail.splice(item, 1);
    }

    //*----------------For Business Ends---------------//

}
