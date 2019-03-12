import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from '../../app.component';

import { NgxSpinnerService } from 'ngx-spinner';

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
}

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

    //* variables for display values on page




    //*Variables for NgModels
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

    //Type combo box  (Business types)
    types = [
        { TId: '1', TName: 'Sole Proprietorship' },
        { TId: '2', TName: 'Partnership' },
        { TId: '3', TName: 'Public Limited Company' },
        { TId: '4', TName: 'Private Limited Company' }
    ];

    userDetail = [
        {
            id: 1,
            businessType: "Sole Proprietorship",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 2,
            businessType: "Partnership",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 3,
            businessType: "Public Limited Company",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 4,
            businessType: "Private Limited Company",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 5,
            businessType: "Partnership",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 6,
            businessType: "Sole Proprietorship",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 7,
            businessType: "Partnership",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 8,
            businessType: "Public Limited Company",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 9,
            businessType: "Private Limited Company",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 10,
            businessType: "Partnership",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 11,
            businessType: "Sole Proprietorship",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 12,
            businessType: "Partnership",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 13,
            businessType: "Public Limited Company",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 14,
            businessType: "Private Limited Company",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        },
        {
            id: 15,
            businessType: "Partnership",
            title: "TitleA",
            nature: "Public Sector",
            ntn: 123,
            website: "www.google.com"
        }
    ];

    //array for partners detail 
    partners: Partner[] = [];



    constructor(private toastr: ToastrManager, private app: AppComponent, private spinner: NgxSpinnerService) { }

    ngOnInit() {
    }

    //function to hide or unhide div
    allow_div() {

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
        else if (this.cmbCType == 'Public Limited Company') {
            this.ppCom = true;
            this.partner = false;
            this.solePro = false;
        }
        else if (this.cmbCType == 'Private Limited Company') {
            this.ppCom = true;
            this.partner = false;
            this.solePro = false;
        }

        if (this.cmbCType != '') {
            this.btnStpr1 = true;
        }
    }

    save() {

        if (this.cmbCType == '') {
            this.toastr.errorToastr('Please select business type', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.solePro == true && (this.sCnic == '' || this.sCnic.length < 13)) {
            this.toastr.errorToastr('Please enter owner CNIC', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.solePro == true && this.sNtn == '') {
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
        } else if (this.ppCom == true && this.ppNtn == '') {
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
        } else if (this.bNtn == '') {
            this.toastr.errorToastr('Please enter business ntn', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.bStrn == '') {
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
        } else {
            this.toastr.successToastr('validation complete information', 'Error', { toastTimeout: (2500) });
            return false;
        }


    }

    addPartner() {

        if (this.pCnic == '' || this.pCnic.length < 13) {
            this.toastr.errorToastr('Please enter CNIC', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.pNtn == '') {
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
                    address: this.pAddress
                });

                this.clearPartner();

            }

        }
    }

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

    remove(item) {
        var index = this.partners.indexOf(item);
        this.partners.splice(index, 1);
    }

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
