import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { AppComponent } from '../../app.component';
import { OrderPipe } from 'ngx-order-pipe';
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
//-------------------Getting Subsidiary data into main table -------------------//
//-------------------Add new Subsidiary into database --------------------------//
//-------------------Add new city into database --------------------------//
//-------------------Update Subsidiary into database ---------------------------//
//-------------------Delete Subsidiary from database ---------------------------//
//-------------------Export into PDF, CSV, Excel -----------------------------//
//-------------------Function for email validation -----------------------------//
//-------------------For sorting the record-----------------------------//
//----------------------------------------------------------------------------//


declare var $: any;
//declare// function showLoader(): any;

@Component({
    selector: 'app-subsidiarie',
    templateUrl: './subsidiarie.component.html',
    styleUrls: ['./subsidiarie.component.scss']
})

export class SubsidiarieComponent implements OnInit {

    //public contactForm: FormGroup;

    // areaCode = false;
    // mobileNetworkCode = false;

    subsidiaryBox = true;

    serverUrl = "http://localhost:42904/";
    tokenKey = "token";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }


    // list for excel data
    excelDataList = [];

    //contactDetail = [];
    //contactDetail = [];
    contactType;
    country;
    area;
    network;
    addressType;
    emailType;

    countryListForAddress;
    provinceList;
    districtList;
    cityList;

    //* variables for display values on page

    //*Variables for NgModels
    tblSearch;
    dSubsidiaryId = '';
    subsidiaryId = '';
    cityName = '';
    subsidiaryTitle = '';
    ntn = '';
    strn = '';
    cmbSubsidiaryType = '';
    representator = '';
    //address = '';
    cmbCity = '';
    //email = '';
    //telephone = '';
    //mobile = '';
    website = '';
    //faxNumber = '';
    agreement = '';

    // subsidiaryContactType = "";
    // subsidiaryCountryCode = "";
    // subsidiaryAreaCode = "";
    // subsidiaryMobileNetworkCode = "";
    // subsidiaryContactNumber = "";

    txtdPassword = '';
    txtdPin = '';

    //* variables for pagination and orderby pipe
    p = 1;
    order = 'info.name';
    reverse = false;
    sortedCollection: any[];
    itemPerPage = '10';

    //*List Variables

    //contact Detail
    contactDetail = [
        {
            contactType: "",
            countryCode: "countryCode",
            contactCode: "",
            areaCode: true,
            mobileCode: false,
            contactNumber: ""
        }
    ];

    //address Detail
    addressDetail = [
        {
            addressType: "",
            address: "",
            countryName: "",
            countryCode: "",
            provinceList: "",
            provinceCode: "",
            districtList: "",
            districtCode: "",
            cityList: "",
            cityCode: ""
        }
    ];

    //Emails Detail
    emailDetail = [
        {
            type: "",
            email: ""
        }
    ];


    cities = [
        { cityId: '1', cityName: 'Islamabad' },
        { cityId: '2', cityName: 'Rawalpindi' },
        { cityId: '3', cityName: 'Lahore' }
    ];

    subsidiaryDetail = [
        {
            subsidiaryDetailId: 1,
            subsidiaryId: 1,
            subsidiaryTitle: 'WORKGAPS LIMITED',
            ntn: '12345678',
            strn: '1234567890',
            subsidiaryTypeId: '2',
            subsidiaryType: "Partnership",
            representator: "Zuhaib Mughal",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 2,
            subsidiaryId: 2,
            subsidiaryTitle: 'WORKGEARUK LTD',
            ntn: '2',
            strn: '2',
            subsidiaryTypeId: '2',
            subsidiaryType: "Partnership",
            representator: "M. Osama",
            address: 'G 11, Islamabad',
            cityId: 2,
            cityName: 'Rawalpindi',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 3,
            subsidiaryId: 3,
            subsidiaryTitle: 'WORKGLOBE DEVELOPMENTS LIMITED',
            ntn: '3',
            strn: '3',
            subsidiaryTypeId: '2',
            subsidiaryType: "Partnership",
            representator: "Shahrukh Mirza",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 4,
            subsidiaryId: 4,
            subsidiaryTitle: 'WORKGREAT LIMITED',
            ntn: '4',
            strn: '4',
            subsidiaryTypeId: '2',
            subsidiaryType: "Partnership",
            representator: "Zain ul Abideen",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 5,
            subsidiaryId: 5,
            subsidiaryTitle: 'WORKGROUP TECHNOLOGY LIMITED',
            ntn: '5',
            strn: '5',
            subsidiaryTypeId: '2',
            subsidiaryType: "Partnership",
            representator: "Ijaz ul Haq",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 6,
            subsidiaryId: 6,
            subsidiaryTitle: 'WORKGUCK LTD',
            ntn: '6',
            strn: '6',
            subsidiaryTypeId: '2',
            subsidiaryType: "JV",
            representator: "Ali Imran",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 7,
            subsidiaryId: 7,
            subsidiaryTitle: 'WORKGURU LTD',
            ntn: '7',
            strn: '7',
            subsidiaryTypeId: '2',
            subsidiaryType: "Partnership",
            representator: "Touseeq Ahmed",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 8,
            subsidiaryId: 8,
            subsidiaryTitle: 'WORKHAM (BARNWOOD) LIMITED',
            ntn: '8',
            strn: '8',
            subsidiaryTypeId: '2',
            subsidiaryType: "Partnership",
            representator: "Umair Ali",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 9,
            subsidiaryId: 9,
            subsidiaryTitle: 'WORKHAM (GLOUCESTER) LIMITED',
            ntn: '9',
            strn: '9',
            subsidiaryTypeId: '2',
            subsidiaryType: "JV",
            representator: "Waqas Iqbal",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 10,
            subsidiaryId: 10,
            subsidiaryTitle: 'WORKHAM DEVELOPMENTS LIMITED',
            ntn: '10',
            strn: '10',
            subsidiaryTypeId: '2',
            subsidiaryType: "Public Limited Company",
            representator: "Saad Khan",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 11,
            subsidiaryId: 11,
            subsidiaryTitle: 'WORKHAM EUROPEAN PROPERTY LIMITED',
            ntn: '11',
            strn: '11',
            subsidiaryTypeId: '2',
            subsidiaryType: "Private Limited Company",
            representator: "Usama Nadeem",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 12,
            subsidiaryId: 12,
            subsidiaryTitle: 'WORKHAM SERVICES LTD',
            ntn: '12',
            strn: '12',
            subsidiaryTypeId: '2',
            subsidiaryType: "Private Limited Company",
            representator: "Areeb Zaidi",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 13,
            subsidiaryId: 13,
            subsidiaryTitle: 'WORKHARD LIMITED',
            ntn: '13',
            strn: '13',
            subsidiaryTypeId: '2',
            subsidiaryType: "Partnership",
            representator: "M. Shahraiz ",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 14,
            subsidiaryId: 14,
            subsidiaryTitle: 'WORKHAUS FURNITURE LTD',
            ntn: '14',
            strn: '14',
            subsidiaryTypeId: '2',
            subsidiaryType: "Public Limited Company",
            representator: "Juniad Khan",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        },
        {
            subsidiaryDetailId: 15,
            subsidiaryId: 15,
            subsidiaryTitle: 'WORKHEALTH LIMITED',
            ntn: '15',
            strn: '15',
            subsidiaryTypeId: '2',
            subsidiaryType: "Private Limited Company",
            representator: "Shahid Jamil",
            address: 'G 11, Islamabad',
            cityId: 1,
            cityName: 'Islamabad',
            email: '@gmail.com',
            telephone: '0572212704',
            mobile: '0313-5300471',
            website: 'infovative.com',
            faxNumber: '0572212704',
            agreement: 'agrement copy'
        }
    ];

    constructor(private toastr: ToastrManager,
        private http: HttpClient,
        private app: AppComponent,
        private excelExportService: IgxExcelExporterService,
        private csvExportService: IgxCsvExporterService,
        private fb: FormBuilder) {
        this.contactType = [
            { label: 'Fax', value: 'Fax' },
            { label: 'Telephone', value: 'Telephone' },
            { label: 'Mobile', value: 'Mobile' },
        ];

        //Country Code
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

        // Country List
        this.countryListForAddress = [
            { label: "Afghanistan", value: "AF" },
            { label: "land Islands", value: "AX" },
            { label: "Albania", value: "AL" },
            { label: "Algeria", value: "DZ" },
            { label: "American Samoa", value: "AS" },
            { label: "AndorrA", value: "AD" },
            { label: "Angola", value: "AO" },
            { label: "Anguilla", value: "AI" },
            { label: "Antarctica", value: "AQ" },
            { label: "Antigua and Barbuda", value: "AG" },
            { label: "Argentina", value: "AR" },
            { label: "Armenia", value: "AM" },
            { label: "Aruba", value: "AW" },
            { label: "Australia", value: "AU" },
            { label: "Austria", value: "AT" },
            { label: "Azerbaijan", value: "AZ" },
            { label: "Bahamas", value: "BS" },
            { label: "Bahrain", value: "BH" },
            { label: "Bangladesh", value: "BD" },
            { label: "Barbados", value: "BB" },
            { label: "Belarus", value: "BY" },
            { label: "Belgium", value: "BE" },
            { label: "Belize", value: "BZ" },
            { label: "Benin", value: "BJ" },
            { label: "Bermuda", value: "BM" },
            { label: "Bhutan", value: "BT" },
            { label: "Bolivia", value: "BO" },
            { label: "Bosnia and Herzegovina", value: "BA" },
            { label: "Botswana", value: "BW" },
            { label: "Bouvet Island", value: "BV" },
            { label: "Brazil", value: "BR" },
            { label: "British Indian Ocean Territory", value: "IO" },
            { label: "Brunei Darussalam", value: "BN" },
            { label: "Bulgaria", value: "BG" },
            { label: "Burkina Faso", value: "BF" },
            { label: "Burundi", value: "BI" },
            { label: "Cambodia", value: "KH" },
            { label: "Cameroon", value: "CM" },
            { label: "Canada", value: "CA" },
            { label: "Cape Verde", value: "CV" },
            { label: "Cayman Islands", value: "KY" },
            { label: "Central African Republic", value: "CF" },
            { label: "Chad", value: "TD" },
            { label: "Chile", value: "CL" },
            { label: "China", value: "CN" },
            { label: "Christmas Island", value: "CX" },
            { label: "Cocos (Keeling) Islands", value: "CC" },
            { label: "Colombia", value: "CO" },
            { label: "Comoros", value: "KM" },
            { label: "Congo", value: "CG" },
            { label: "Congo, The Democratic Republic of the", value: "CD" },
            { label: "Cook Islands", value: "CK" },
            { label: "Costa Rica", value: "CR" },
            { label: "Cote D\"Ivoire", value: "CI" },
            { label: "Croatia", value: "HR" },
            { label: "Cuba", value: "CU" },
            { label: "Cyprus", value: "CY" },
            { label: "Czech Republic", value: "CZ" },
            { label: "Denmark", value: "DK" },
            { label: "Djibouti", value: "DJ" },
            { label: "Dominica", value: "DM" },
            { label: "Dominican Republic", value: "DO" },
            { label: "Ecuador", value: "EC" },
            { label: "Egypt", value: "EG" },
            { label: "El Salvador", value: "SV" },
            { label: "Equatorial Guinea", value: "GQ" },
            { label: "Eritrea", value: "ER" },
            { label: "Estonia", value: "EE" },
            { label: "Ethiopia", value: "ET" },
            { label: "Falkland Islands (Malvinas)", value: "FK" },
            { label: "Faroe Islands", value: "FO" },
            { label: "Fiji", value: "FJ" },
            { label: "Finland", value: "FI" },
            { label: "France", value: "FR" },
            { label: "French Guiana", value: "GF" },
            { label: "French Polynesia", value: "PF" },
            { label: "French Southern Territories", value: "TF" },
            { label: "Gabon", value: "GA" },
            { label: "Gambia", value: "GM" },
            { label: "Georgia", value: "GE" },
            { label: "Germany", value: "DE" },
            { label: "Ghana", value: "GH" },
            { label: "Gibraltar", value: "GI" },
            { label: "Greece", value: "GR" },
            { label: "Greenland", value: "GL" },
            { label: "Grenada", value: "GD" },
            { label: "Guadeloupe", value: "GP" },
            { label: "Guam", value: "GU" },
            { label: "Guatemala", value: "GT" },
            { label: "Guernsey", value: "GG" },
            { label: "Guinea", value: "GN" },
            { label: "Guinea-Bissau", value: "GW" },
            { label: "Guyana", value: "GY" },
            { label: "Haiti", value: "HT" },
            { label: "Heard Island and Mcdonald Islands", value: "HM" },
            { label: "Holy See (Vatican City State)", value: "VA" },
            { label: "Honduras", value: "HN" },
            { label: "Hong Kong", value: "HK" },
            { label: "Hungary", value: "HU" },
            { label: "Iceland", value: "IS" },
            { label: "India", value: "IN" },
            { label: "Indonesia", value: "ID" },
            { label: "Iran, Islamic Republic Of", value: "IR" },
            { label: "Iraq", value: "IQ" },
            { label: "Ireland", value: "IE" },
            { label: "Isle of Man", value: "IM" },
            { label: "Israel", value: "IL" },
            { label: "Italy", value: "IT" },
            { label: "Jamaica", value: "JM" },
            { label: "Japan", value: "JP" },
            { label: "Jersey", value: "JE" },
            { label: "Jordan", value: "JO" },
            { label: "Kazakhstan", value: "KZ" },
            { label: "Kenya", value: "KE" },
            { label: "Kiribati", value: "KI" },
            { label: "Korea, Democratic People\"S Republic of", value: "KP" },
            { label: "Korea, Republic of", value: "KR" },
            { label: "Kuwait", value: "KW" },
            { label: "Kyrgyzstan", value: "KG" },
            { label: "Lao People\"S Democratic Republic", value: "LA" },
            { label: "Latvia", value: "LV" },
            { label: "Lebanon", value: "LB" },
            { label: "Lesotho", value: "LS" },
            { label: "Liberia", value: "LR" },
            { label: "Libyan Arab Jamahiriya", value: "LY" },
            { label: "Liechtenstein", value: "LI" },
            { label: "Lithuania", value: "LT" },
            { label: "Luxembourg", value: "LU" },
            { label: "Macao", value: "MO" },
            { label: "Macedonia, The Former Yugoslav Republic of", value: "MK" },
            { label: "Madagascar", value: "MG" },
            { label: "Malawi", value: "MW" },
            { label: "Malaysia", value: "MY" },
            { label: "Maldives", value: "MV" },
            { label: "Mali", value: "ML" },
            { label: "Malta", value: "MT" },
            { label: "Marshall Islands", value: "MH" },
            { label: "Martinique", value: "MQ" },
            { label: "Mauritania", value: "MR" },
            { label: "Mauritius", value: "MU" },
            { label: "Mayotte", value: "YT" },
            { label: "Mexico", value: "MX" },
            { label: "Micronesia, Federated States of", value: "FM" },
            { label: "Moldova, Republic of", value: "MD" },
            { label: "Monaco", value: "MC" },
            { label: "Mongolia", value: "MN" },
            { label: "Montenegro", value: "ME" },
            { label: "Montserrat", value: "MS" },
            { label: "Morocco", value: "MA" },
            { label: "Mozambique", value: "MZ" },
            { label: "Myanmar", value: "MM" },
            { label: "Namibia", value: "NA" },
            { label: "Nauru", value: "NR" },
            { label: "Nepal", value: "NP" },
            { label: "Netherlands", value: "NL" },
            { label: "Netherlands Antilles", value: "AN" },
            { label: "New Caledonia", value: "NC" },
            { label: "New Zealand", value: "NZ" },
            { label: "Nicaragua", value: "NI" },
            { label: "Niger", value: "NE" },
            { label: "Nigeria", value: "NG" },
            { label: "Niue", value: "NU" },
            { label: "Norfolk Island", value: "NF" },
            { label: "Northern Mariana Islands", value: "MP" },
            { label: "Norway", value: "NO" },
            { label: "Oman", value: "OM" },
            { label: "Pakistan", value: "PK" },
            { label: "Palau", value: "PW" },
            { label: "Palestinian Territory, Occupied", value: "PS" },
            { label: "Panama", value: "PA" },
            { label: "Papua New Guinea", value: "PG" },
            { label: "Paraguay", value: "PY" },
            { label: "Peru", value: "PE" },
            { label: "Philippines", value: "PH" },
            { label: "Pitcairn", value: "PN" },
            { label: "Poland", value: "PL" },
            { label: "Portugal", value: "PT" },
            { label: "Puerto Rico", value: "PR" },
            { label: "Qatar", value: "QA" },
            { label: "Reunion", value: "RE" },
            { label: "Romania", value: "RO" },
            { label: "Russian Federation", value: "RU" },
            { label: "RWANDA", value: "RW" },
            { label: "Saint Helena", value: "SH" },
            { label: "Saint Kitts and Nevis", value: "KN" },
            { label: "Saint Lucia", value: "LC" },
            { label: "Saint Pierre and Miquelon", value: "PM" },
            { label: "Saint Vincent and the Grenadines", value: "VC" },
            { label: "Samoa", value: "WS" },
            { label: "San Marino", value: "SM" },
            { label: "Sao Tome and Principe", value: "ST" },
            { label: "Saudi Arabia", value: "SA" },
            { label: "Senegal", value: "SN" },
            { label: "Serbia", value: "RS" },
            { label: "Seychelles", value: "SC" },
            { label: "Sierra Leone", value: "SL" },
            { label: "Singapore", value: "SG" },
            { label: "Slovakia", value: "SK" },
            { label: "Slovenia", value: "SI" },
            { label: "Solomon Islands", value: "SB" },
            { label: "Somalia", value: "SO" },
            { label: "South Africa", value: "ZA" },
            { label: "South Georgia and the South Sandwich Islands", value: "GS" },
            { label: "Spain", value: "ES" },
            { label: "Sri Lanka", value: "LK" },
            { label: "Sudan", value: "SD" },
            { label: "Surilabel", value: "SR" },
            { label: "Svalbard and Jan Mayen", value: "SJ" },
            { label: "Swaziland", value: "SZ" },
            { label: "Sweden", value: "SE" },
            { label: "Switzerland", value: "CH" },
            { label: "Syrian Arab Republic", value: "SY" },
            { label: "Taiwan, Province of China", value: "TW" },
            { label: "Tajikistan", value: "TJ" },
            { label: "Tanzania, United Republic of", value: "TZ" },
            { label: "Thailand", value: "TH" },
            { label: "Timor-Leste", value: "TL" },
            { label: "Togo", value: "TG" },
            { label: "Tokelau", value: "TK" },
            { label: "Tonga", value: "TO" },
            { label: "Trinidad and Tobago", value: "TT" },
            { label: "Tunisia", value: "TN" },
            { label: "Turkey", value: "TR" },
            { label: "Turkmenistan", value: "TM" },
            { label: "Turks and Caicos Islands", value: "TC" },
            { label: "Tuvalu", value: "TV" },
            { label: "Uganda", value: "UG" },
            { label: "Ukraine", value: "UA" },
            { label: "United Arab Emirates", value: "AE" },
            { label: "United Kingdom", value: "GB" },
            { label: "United States", value: "US" },
            { label: "United States Minor Outlying Islands", value: "UM" },
            { label: "Uruguay", value: "UY" },
            { label: "Uzbekistan", value: "UZ" },
            { label: "Vanuatu", value: "VU" },
            { label: "Venezuela", value: "VE" },
            { label: "Viet Nam", value: "VN" },
            { label: "Virgin Islands, British", value: "VG" },
            { label: "Virgin Islands, U.S.", value: "VI" },
            { label: "Wallis and Futuna", value: "WF" },
            { label: "Western Sahara", value: "EH" },
            { label: "Yemen", value: "YE" },
            { label: "Zambia", value: "ZM" },
            { label: "Zimbabwe", value: "ZW" }
        ];

        //Province List

        this.provinceList = [
            { label: "Punjab ", value: "Punjab" },
            { label: "Pakhtoon Khuwah  ", value: "KPK" },
            { label: "Sindh ", value: "Sindh " },
            { label: "Balouchistan  ", value: "Balouchistan " },
            { label: "Gilgit Baltistan ", value: "Gilgit Baltistan" }
        ];

        //City List

        this.cityList = [
            { label: "Islamabad ", value: "Islamabad" },
            { label: "Lahore", value: "Lahore" },
            { label: "Peshawer", value: "Peshawer" },
            { label: "Karachi ", value: "Karachi " },
            { label: "Quetta  ", value: "Quetta " },
            { label: "Gilgit", value: "Gilgit" }
        ];

        //District List

        this.districtList = [
            { label: "Attock ", value: "Attock" },
            { label: "Gujranwala", value: "Gujranwala" },
            { label: "Faisalabad ", value: "Faisalabad " },
            { label: "Jhelum  ", value: "Jhelum " },
            { label: "Sialkot", value: "Sialkot" },
        ];

        //Email Types
        this.emailType = [
            { label: 'Personal Email', value: 'Personal Email' },
            { label: 'Office Email', value: 'Office Email' }
        ];
    }

    ngOnInit() {
        //Creating Array of ComboBox "subsidiaryes"
        // this.contactForm = this.fb.group({
        //     subsidiary: this.fb.array([])
        // });
    }

    @ViewChild("excelDataContent") public excelDataContent: IgxGridComponent;//For excel
    @ViewChild("exportPDF") public exportPDF: ElementRef;


    //function for get all saved currencies from db
    getSubsidiaryDetail() {
        return false;

        var Token = localStorage.getItem(this.tokenKey);

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });

        this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
            this.cities = data
        });
    }


    //Function for save and update currency 
    save() {
        if (this.subsidiaryTitle.trim() == '') {
            this.toastr.errorToastr('Please enter subsidiary title', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.ntn.trim() == '' || this.ntn.length < 8) {
            this.toastr.errorToastr('Please enter NTN', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.strn.trim() == '' || this.strn.length < 10) {
            this.toastr.errorToastr('Please enter STRM', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.cmbSubsidiaryType == '') {
            this.toastr.errorToastr('Please subsidiary type', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.representator.trim() == '') {
            this.toastr.errorToastr('Please enter representator', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.cmbCity == '') {
            this.toastr.errorToastr('Please select city', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.website.trim() == '') {
            this.toastr.errorToastr('Please enter website', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.agreement == '') {
            this.toastr.errorToastr('Please attach agreement copy', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // address type conditions
        else if (this.addressDetail.length == 0) {
            this.toastr.errorToastr('Please Add Address Info', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // contact type conditions
        else if (this.contactDetail.length == 0) {
            this.toastr.errorToastr('Please Add Contact Info Type', 'Error', { toastTimeout: (2500) });
            return false;
        }
        // email type conditions
        else if (this.emailDetail.length == 0) {
            this.toastr.errorToastr('Please Add Email Info', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else {
            // address type conditions
            if (this.addressDetail.length > 0) {
                for (let i = 0; i < this.addressDetail.length; i++) {
                    if (this.addressDetail[i].addressType.trim() == "") {
                        this.toastr.errorToastr('Please Select Address Type', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.addressDetail[i].address.trim() == "") {
                        this.toastr.errorToastr('Please Enter Address', 'Error', { toastTimeout: (2500) });
                        return false;
                    }

                    else if (this.addressDetail[i].countryCode.trim() == "") {
                        this.toastr.errorToastr('Please Select Country', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.addressDetail[i].provinceCode.trim() == "") {
                        this.toastr.errorToastr('Please Select Province', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.addressDetail[i].districtCode.trim() == "") {
                        this.toastr.errorToastr('Please Select District', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.addressDetail[i].cityCode.trim() == "") {
                        this.toastr.errorToastr('Please Select City', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                }
            }

            // contact type conditions
            if (this.contactDetail.length > 0) {
                for (let i = 0; i < this.contactDetail.length; i++) {
                    if (this.contactDetail[i].contactType.trim() == "") {
                        this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.contactDetail[i].countryCode.trim() == "countryCode") {
                        this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.contactDetail[i].contactCode.trim() == "") {
                        this.toastr.errorToastr('Please Select Contact Code', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.contactDetail[i].contactNumber.trim() == "") {
                        this.toastr.errorToastr('Please Enter Contact Number', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                }
            }

            // email type conditions
            if (this.emailDetail.length > 0) {
                for (let i = 0; i < this.emailDetail.length; i++) {
                    if (this.emailDetail[i].type.trim() == "") {
                        this.toastr.errorToastr('Please Select Email Type', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.emailDetail[i].email.trim() == "") {
                        this.toastr.errorToastr('Please Enter Email', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                    else if (this.isEmail(this.emailDetail[i].email.trim()) == false) {
                        this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
                        return false;
                    }
                }
            }


            if (this.subsidiaryId != '') {
                this.app.showSpinner();
                this.toastr.successToastr('updated successfully', 'Success', { toastTimeout: (2500) });
                this.clear();
                $('#subsidiaryModal').modal('hide');
                this.app.hideSpinner();
                return false;

                var updateData = { "ID": this.subsidiaryId, Password: this.txtdPassword, PIN: this.txtdPin };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                this.http.put(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record updated Successfully', 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }
                });
            }
            else {
                this.app.showSpinner();
                this.toastr.successToastr('saved successfully', 'Success', { toastTimeout: (2500) });

                this.clear();
                $('#subsidiaryModal').modal('hide');
                this.app.hideSpinner();
                return false;


                var saveData = {
                    "subsidiaryTitle": this.subsidiaryTitle,
                    "representator": this.representator,
                    "ntn": this.ntn, "strn": this.strn,
                    "website": this.website,
                    "subsidiaryTypeId": this.cmbSubsidiaryType,
                    //"telephone": this.telephone,
                    //"mobile": this.mobile,
                    //"address": this.address,
                    //"email": this.email
                };


                //var token = localStorage.getItem(this.tokenKey);

                //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

                this.http.post(this.serverUrl + 'api/saveSubsidiary', saveData, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != "Done") {
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


    //functin for save new section 
    addCity() {

        if (this.cityName.trim() == '') {
            this.toastr.errorToastr('Please enter city name', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else {
            let data = this.cities.find(x => x.cityName == this.cityName);

            if (data != undefined) {
                this.toastr.errorToastr('City name already exist', 'Error', { toastTimeout: (2500) });
                return false;
            }
            else {
                this.app.showSpinner();
                this.app.hideSpinner();

                //this.toastr.successToastr('Saved successfully', 'Success', { toastTimeout: (2500) });

                //this.cities.push({ cityId: this.cities.length + "", cityName: this.cityName });

                // this.cityName = '';
                // $('#addCityModel').click();

                return false;

                var updateData = "cityName=" + this.cityName;
                alert(updateData);
                //var token = localStorage.getItem(this.tokenKey);

                //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

                this.http.post(this.serverUrl + 'api/citys?' + updateData, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record Inserted Successfully', 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }
                });
            }
        }
    }


    //function for empty all fields
    clear() {

        this.dSubsidiaryId = '';
        this.subsidiaryId = '';
        this.cityName = '';
        this.subsidiaryTitle = '';
        this.ntn = '';
        this.strn = '';
        this.cmbSubsidiaryType = '';
        this.representator = '';
        //this.address = '';
        this.cmbCity = '';
        //this.email = '';
        //this.telephone = '';
        //this.mobile = '';
        this.website = '';
        //this.faxNumber = '';
        this.agreement = '';

        this.addressDetail = [
            {
                addressType: "",
                address: "",
                countryName: "",
                countryCode: "",
                provinceList: "",
                provinceCode: "",
                districtList: "",
                districtCode: "",
                cityList: "",
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

        //this.contactForm.reset();

        // this.subsidiaryContactType = '';
        // this.subsidiaryCountryCode = '';
        // this.subsidiaryAreaCode = '';
        // this.subsidiaryMobileNetworkCode = '';
        // this.subsidiaryContactNumber = '';

        this.txtdPassword = '';
        this.txtdPin = '';
    }


    //function for edit existing currency 
    edit(item) {
        this.subsidiaryId = item.subsidiaryId;
        this.subsidiaryTitle = item.subsidiaryTitle;
        this.ntn = item.ntn;
        this.strn = item.strn;
        this.cmbSubsidiaryType = item.subsidiaryType;
        this.representator = item.representator;
        //this.address = item.address;
        this.cmbCity = item.cityId.toString();
        //this.email = item.email;
        //this.telephone = item.telephone;
        //this.mobile = item.mobile;
        this.website = item.website;
        //this.faxNumber = item.faxNumber;
        this.agreement = item.agreement;
    }


    //functions for delete currency
    deleteTemp(item) {
        this.clear();
        this.dSubsidiaryId = item.subsidiaryDetailId;
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
        else if (this.dSubsidiaryId == '') {
            this.toastr.errorToastr('Invalid delete request', 'Error', { toastTimeout: (2500) });
            return false
        }
        else {
            this.app.showSpinner();
            this.app.hideSpinner();
            this.toastr.successToastr('Deleted successfully', 'Success', { toastTimeout: (2500) });
            this.clear();

            $('#closeDeleteModel').click();

            return false;

            var data = { "ID": this.dSubsidiaryId, Password: this.txtdPassword, PIN: this.txtdPin };

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
            for (var i = 0; i < this.subsidiaryDetail.length; i++) {
                completeDataList.push({
                    subsidiaryTitle: this.subsidiaryDetail[i].subsidiaryTitle,
                    subsidiaryType: this.subsidiaryDetail[i].subsidiaryType,
                    representator: this.subsidiaryDetail[i].representator,
                    mobile: this.subsidiaryDetail[i].mobile,
                    website: this.subsidiaryDetail[i].website
                });
            }
            this.csvExportService.exportData(completeDataList, new IgxCsvExporterOptions("SubsidiaryCompleteCSV", CsvFileTypes.CSV));
        }
        // case 2: When tblSearch is not empty then assign new data list
        else if (this.tblSearch != "") {
            var filteredDataList = [];
            for (var i = 0; i < this.subsidiaryDetail.length; i++) {
                if (this.subsidiaryDetail[i].subsidiaryTitle.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.subsidiaryDetail[i].subsidiaryType.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.subsidiaryDetail[i].representator.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.subsidiaryDetail[i].mobile.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.subsidiaryDetail[i].website.toUpperCase().includes(this.tblSearch.toUpperCase())) {
                    filteredDataList.push({
                        subsidiaryTitle: this.subsidiaryDetail[i].subsidiaryTitle,
                        subsidiaryType: this.subsidiaryDetail[i].subsidiaryType,
                        representator: this.subsidiaryDetail[i].representator,
                        mobile: this.subsidiaryDetail[i].mobile,
                        website: this.subsidiaryDetail[i].website
                    });
                }
            }

            if (filteredDataList.length > 0) {
                this.csvExportService.exportData(filteredDataList, new IgxCsvExporterOptions("SubsidiaryFilterCSV", CsvFileTypes.CSV));
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
            for (var i = 0; i < this.subsidiaryDetail.length; i++) {
                this.excelDataList.push({
                    subsidiaryTitle: this.subsidiaryDetail[i].subsidiaryTitle,
                    subsidiaryType: this.subsidiaryDetail[i].subsidiaryType,
                    representator: this.subsidiaryDetail[i].representator,
                    mobile: this.subsidiaryDetail[i].mobile,
                    website: this.subsidiaryDetail[i].website
                });
            }
            this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("SubsidiaryCompleteExcel"));
            this.excelDataList = [];
        }
        // case 2: When tblSearch is not empty then assign new data list
        else if (this.tblSearch != "") {
            for (var i = 0; i < this.subsidiaryDetail.length; i++) {
                if (this.subsidiaryDetail[i].subsidiaryTitle.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.subsidiaryDetail[i].subsidiaryType.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.subsidiaryDetail[i].representator.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.subsidiaryDetail[i].mobile.toUpperCase().includes(this.tblSearch.toUpperCase()) ||
                    this.subsidiaryDetail[i].website.toUpperCase().includes(this.tblSearch.toUpperCase())) {
                    this.excelDataList.push({
                        subsidiaryTitle: this.subsidiaryDetail[i].subsidiaryTitle,
                        subsidiaryType: this.subsidiaryDetail[i].subsidiaryType,
                        representator: this.subsidiaryDetail[i].representator,
                        mobile: this.subsidiaryDetail[i].mobile,
                        website: this.subsidiaryDetail[i].website
                    });
                }
            }

            if (this.excelDataList.length > 0) {
                this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("SubsidiaryFilterExcel"));
                this.excelDataList = [];
            }
            else {
                this.toastr.errorToastr('Oops! No data found', 'Error', { toastTimeout: (2500) });
            }
        }
    }

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
            countryName: "",
            countryCode: "",
            provinceList: "",
            provinceCode: "",
            districtList: "",
            districtCode: "",
            cityList: "",
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

}
