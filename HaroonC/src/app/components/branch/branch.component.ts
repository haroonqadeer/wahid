import { Component, OnInit, ViewChild, ElementRef, NgModule, EventEmitter, Output } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from '../../app.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';

//import { SelectItem } from 'primeng/api';

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
import { NgForOf } from '@angular/common';

//import { AddressComponent } from 'src/app/shared/address/address.component';

// import { DepartmentComponent } from "src/app/components/department/department.component";

import { ValidationAddressService } from 'src/app/shared/services/validation-address.service';
import { AddressComponent } from 'src/app/shared/address/address.component';


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

// interface City {
//   label: string;
//   countryCode: string;
// }


@Component({
  providers: [AddressComponent],
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})

export class BranchComponent implements OnInit {

  @Output() myEvent = new EventEmitter();

  // public contactForm: FormGroup;
  // public addressForm: FormGroup;

  //areaCode = false;
  //mobileNetworkCode = false;

  branchBox = true;

  //work = false;
  //shipping = false;
  //postal = false;


  serverUrl = "http://localhost:55536/";
  tokenKey = "token";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // list for excel data
  excelDataList = [];
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


  //*Page Models
  branchId = null;
  branchType = "";
  branchTitle = "";
  //branchAddress = "";
  branchCity = "";
  //branchEmail = "";
  //branchPhone = "";
  //branchMobile = "";
  //branchFax = "";
  branchWebsite = "";

  // branchContactType = "";
  // branchCountryCode = "";
  // branchAreaCode = "";
  // branchMobileNetworkCode = "";
  // branchContactNumber = "";

  branchAddressType = "";
  branchWork = "";
  branchShipping = "";
  branchPostal = "";

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
  order = 'info.label';
  reverse = false;
  sortedCollection: any[];
  itemPerPage = '10';

  //contact Detail
  contactDetail = [
    {
      contactType: "",
      countryPhoneCode: "countryCode",
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


  branches = [
    {
      branId: 1,
      branType: "Head Quarter",
      branTitle: "Infovative Solution",

      ctyId: 1,
      ctyName: "Islamabad",
      branWebsite: "www.google.com",
      //*------------------------------------//
      // //address info
      // branAddress: this.addressDetail[0].address,
      // //contact info
      // branContactType: this.contactDetail[0].contactType,
      // branCountryCode: this.contactDetail[0].countryCode,
      // branAreaCode: this.contactDetail[0].contactCode,
      // branMobileNetworkCode: this.contactDetail[0].contactCode,
      // branContactNumber: this.contactDetail[0].contactNumber,
      // //email info
      // branEmail: this.emailDetail[0].email
      //*--------------------------------------//
      //branContact: this.contactDetail,
      branPhone: "0512290450",
      branMobile: "03331234567",
      branFax: "0512234567",
      branAddress: "G-14 Markaz",
      branEmail: "abc@gmail.com"

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
    private fb: FormBuilder,
    private validObj: ValidationAddressService,
    private addObj: AddressComponent) {


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

    // //Address Types
    // this.addressType = [
    //   { label: 'Current Address', value: 'Current Address' },
    //   { label: 'Office Address', value: 'Office Address' },
    //   { label: 'Postal Address', value: 'Postal Address' }
    // ];

    // // Country List
    // this.countryListForAddress = [
    //   { label: "Afghanistan", value: "AF" },
    //   { label: "land Islands", value: "AX" },
    //   { label: "Albania", value: "AL" },
    //   { label: "Algeria", value: "DZ" },
    //   { label: "American Samoa", value: "AS" },
    //   { label: "AndorrA", value: "AD" },
    //   { label: "Angola", value: "AO" },
    //   { label: "Anguilla", value: "AI" },
    //   { label: "Antarctica", value: "AQ" },
    //   { label: "Antigua and Barbuda", value: "AG" },
    //   { label: "Argentina", value: "AR" },
    //   { label: "Armenia", value: "AM" },
    //   { label: "Aruba", value: "AW" },
    //   { label: "Australia", value: "AU" },
    //   { label: "Austria", value: "AT" },
    //   { label: "Azerbaijan", value: "AZ" },
    //   { label: "Bahamas", value: "BS" },
    //   { label: "Bahrain", value: "BH" },
    //   { label: "Bangladesh", value: "BD" },
    //   { label: "Barbados", value: "BB" },
    //   { label: "Belarus", value: "BY" },
    //   { label: "Belgium", value: "BE" },
    //   { label: "Belize", value: "BZ" },
    //   { label: "Benin", value: "BJ" },
    //   { label: "Bermuda", value: "BM" },
    //   { label: "Bhutan", value: "BT" },
    //   { label: "Bolivia", value: "BO" },
    //   { label: "Bosnia and Herzegovina", value: "BA" },
    //   { label: "Botswana", value: "BW" },
    //   { label: "Bouvet Island", value: "BV" },
    //   { label: "Brazil", value: "BR" },
    //   { label: "British Indian Ocean Territory", value: "IO" },
    //   { label: "Brunei Darussalam", value: "BN" },
    //   { label: "Bulgaria", value: "BG" },
    //   { label: "Burkina Faso", value: "BF" },
    //   { label: "Burundi", value: "BI" },
    //   { label: "Cambodia", value: "KH" },
    //   { label: "Cameroon", value: "CM" },
    //   { label: "Canada", value: "CA" },
    //   { label: "Cape Verde", value: "CV" },
    //   { label: "Cayman Islands", value: "KY" },
    //   { label: "Central African Republic", value: "CF" },
    //   { label: "Chad", value: "TD" },
    //   { label: "Chile", value: "CL" },
    //   { label: "China", value: "CN" },
    //   { label: "Christmas Island", value: "CX" },
    //   { label: "Cocos (Keeling) Islands", value: "CC" },
    //   { label: "Colombia", value: "CO" },
    //   { label: "Comoros", value: "KM" },
    //   { label: "Congo", value: "CG" },
    //   { label: "Congo, The Democratic Republic of the", value: "CD" },
    //   { label: "Cook Islands", value: "CK" },
    //   { label: "Costa Rica", value: "CR" },
    //   { label: "Cote D\"Ivoire", value: "CI" },
    //   { label: "Croatia", value: "HR" },
    //   { label: "Cuba", value: "CU" },
    //   { label: "Cyprus", value: "CY" },
    //   { label: "Czech Republic", value: "CZ" },
    //   { label: "Denmark", value: "DK" },
    //   { label: "Djibouti", value: "DJ" },
    //   { label: "Dominica", value: "DM" },
    //   { label: "Dominican Republic", value: "DO" },
    //   { label: "Ecuador", value: "EC" },
    //   { label: "Egypt", value: "EG" },
    //   { label: "El Salvador", value: "SV" },
    //   { label: "Equatorial Guinea", value: "GQ" },
    //   { label: "Eritrea", value: "ER" },
    //   { label: "Estonia", value: "EE" },
    //   { label: "Ethiopia", value: "ET" },
    //   { label: "Falkland Islands (Malvinas)", value: "FK" },
    //   { label: "Faroe Islands", value: "FO" },
    //   { label: "Fiji", value: "FJ" },
    //   { label: "Finland", value: "FI" },
    //   { label: "France", value: "FR" },
    //   { label: "French Guiana", value: "GF" },
    //   { label: "French Polynesia", value: "PF" },
    //   { label: "French Southern Territories", value: "TF" },
    //   { label: "Gabon", value: "GA" },
    //   { label: "Gambia", value: "GM" },
    //   { label: "Georgia", value: "GE" },
    //   { label: "Germany", value: "DE" },
    //   { label: "Ghana", value: "GH" },
    //   { label: "Gibraltar", value: "GI" },
    //   { label: "Greece", value: "GR" },
    //   { label: "Greenland", value: "GL" },
    //   { label: "Grenada", value: "GD" },
    //   { label: "Guadeloupe", value: "GP" },
    //   { label: "Guam", value: "GU" },
    //   { label: "Guatemala", value: "GT" },
    //   { label: "Guernsey", value: "GG" },
    //   { label: "Guinea", value: "GN" },
    //   { label: "Guinea-Bissau", value: "GW" },
    //   { label: "Guyana", value: "GY" },
    //   { label: "Haiti", value: "HT" },
    //   { label: "Heard Island and Mcdonald Islands", value: "HM" },
    //   { label: "Holy See (Vatican City State)", value: "VA" },
    //   { label: "Honduras", value: "HN" },
    //   { label: "Hong Kong", value: "HK" },
    //   { label: "Hungary", value: "HU" },
    //   { label: "Iceland", value: "IS" },
    //   { label: "India", value: "IN" },
    //   { label: "Indonesia", value: "ID" },
    //   { label: "Iran, Islamic Republic Of", value: "IR" },
    //   { label: "Iraq", value: "IQ" },
    //   { label: "Ireland", value: "IE" },
    //   { label: "Isle of Man", value: "IM" },
    //   { label: "Israel", value: "IL" },
    //   { label: "Italy", value: "IT" },
    //   { label: "Jamaica", value: "JM" },
    //   { label: "Japan", value: "JP" },
    //   { label: "Jersey", value: "JE" },
    //   { label: "Jordan", value: "JO" },
    //   { label: "Kazakhstan", value: "KZ" },
    //   { label: "Kenya", value: "KE" },
    //   { label: "Kiribati", value: "KI" },
    //   { label: "Korea, Democratic People\"S Republic of", value: "KP" },
    //   { label: "Korea, Republic of", value: "KR" },
    //   { label: "Kuwait", value: "KW" },
    //   { label: "Kyrgyzstan", value: "KG" },
    //   { label: "Lao People\"S Democratic Republic", value: "LA" },
    //   { label: "Latvia", value: "LV" },
    //   { label: "Lebanon", value: "LB" },
    //   { label: "Lesotho", value: "LS" },
    //   { label: "Liberia", value: "LR" },
    //   { label: "Libyan Arab Jamahiriya", value: "LY" },
    //   { label: "Liechtenstein", value: "LI" },
    //   { label: "Lithuania", value: "LT" },
    //   { label: "Luxembourg", value: "LU" },
    //   { label: "Macao", value: "MO" },
    //   { label: "Macedonia, The Former Yugoslav Republic of", value: "MK" },
    //   { label: "Madagascar", value: "MG" },
    //   { label: "Malawi", value: "MW" },
    //   { label: "Malaysia", value: "MY" },
    //   { label: "Maldives", value: "MV" },
    //   { label: "Mali", value: "ML" },
    //   { label: "Malta", value: "MT" },
    //   { label: "Marshall Islands", value: "MH" },
    //   { label: "Martinique", value: "MQ" },
    //   { label: "Mauritania", value: "MR" },
    //   { label: "Mauritius", value: "MU" },
    //   { label: "Mayotte", value: "YT" },
    //   { label: "Mexico", value: "MX" },
    //   { label: "Micronesia, Federated States of", value: "FM" },
    //   { label: "Moldova, Republic of", value: "MD" },
    //   { label: "Monaco", value: "MC" },
    //   { label: "Mongolia", value: "MN" },
    //   { label: "Montenegro", value: "ME" },
    //   { label: "Montserrat", value: "MS" },
    //   { label: "Morocco", value: "MA" },
    //   { label: "Mozambique", value: "MZ" },
    //   { label: "Myanmar", value: "MM" },
    //   { label: "Namibia", value: "NA" },
    //   { label: "Nauru", value: "NR" },
    //   { label: "Nepal", value: "NP" },
    //   { label: "Netherlands", value: "NL" },
    //   { label: "Netherlands Antilles", value: "AN" },
    //   { label: "New Caledonia", value: "NC" },
    //   { label: "New Zealand", value: "NZ" },
    //   { label: "Nicaragua", value: "NI" },
    //   { label: "Niger", value: "NE" },
    //   { label: "Nigeria", value: "NG" },
    //   { label: "Niue", value: "NU" },
    //   { label: "Norfolk Island", value: "NF" },
    //   { label: "Northern Mariana Islands", value: "MP" },
    //   { label: "Norway", value: "NO" },
    //   { label: "Oman", value: "OM" },
    //   { label: "Pakistan", value: "PK" },
    //   { label: "Palau", value: "PW" },
    //   { label: "Palestinian Territory, Occupied", value: "PS" },
    //   { label: "Panama", value: "PA" },
    //   { label: "Papua New Guinea", value: "PG" },
    //   { label: "Paraguay", value: "PY" },
    //   { label: "Peru", value: "PE" },
    //   { label: "Philippines", value: "PH" },
    //   { label: "Pitcairn", value: "PN" },
    //   { label: "Poland", value: "PL" },
    //   { label: "Portugal", value: "PT" },
    //   { label: "Puerto Rico", value: "PR" },
    //   { label: "Qatar", value: "QA" },
    //   { label: "Reunion", value: "RE" },
    //   { label: "Romania", value: "RO" },
    //   { label: "Russian Federation", value: "RU" },
    //   { label: "RWANDA", value: "RW" },
    //   { label: "Saint Helena", value: "SH" },
    //   { label: "Saint Kitts and Nevis", value: "KN" },
    //   { label: "Saint Lucia", value: "LC" },
    //   { label: "Saint Pierre and Miquelon", value: "PM" },
    //   { label: "Saint Vincent and the Grenadines", value: "VC" },
    //   { label: "Samoa", value: "WS" },
    //   { label: "San Marino", value: "SM" },
    //   { label: "Sao Tome and Principe", value: "ST" },
    //   { label: "Saudi Arabia", value: "SA" },
    //   { label: "Senegal", value: "SN" },
    //   { label: "Serbia", value: "RS" },
    //   { label: "Seychelles", value: "SC" },
    //   { label: "Sierra Leone", value: "SL" },
    //   { label: "Singapore", value: "SG" },
    //   { label: "Slovakia", value: "SK" },
    //   { label: "Slovenia", value: "SI" },
    //   { label: "Solomon Islands", value: "SB" },
    //   { label: "Somalia", value: "SO" },
    //   { label: "South Africa", value: "ZA" },
    //   { label: "South Georgia and the South Sandwich Islands", value: "GS" },
    //   { label: "Spain", value: "ES" },
    //   { label: "Sri Lanka", value: "LK" },
    //   { label: "Sudan", value: "SD" },
    //   { label: "Surilabel", value: "SR" },
    //   { label: "Svalbard and Jan Mayen", value: "SJ" },
    //   { label: "Swaziland", value: "SZ" },
    //   { label: "Sweden", value: "SE" },
    //   { label: "Switzerland", value: "CH" },
    //   { label: "Syrian Arab Republic", value: "SY" },
    //   { label: "Taiwan, Province of China", value: "TW" },
    //   { label: "Tajikistan", value: "TJ" },
    //   { label: "Tanzania, United Republic of", value: "TZ" },
    //   { label: "Thailand", value: "TH" },
    //   { label: "Timor-Leste", value: "TL" },
    //   { label: "Togo", value: "TG" },
    //   { label: "Tokelau", value: "TK" },
    //   { label: "Tonga", value: "TO" },
    //   { label: "Trinidad and Tobago", value: "TT" },
    //   { label: "Tunisia", value: "TN" },
    //   { label: "Turkey", value: "TR" },
    //   { label: "Turkmenistan", value: "TM" },
    //   { label: "Turks and Caicos Islands", value: "TC" },
    //   { label: "Tuvalu", value: "TV" },
    //   { label: "Uganda", value: "UG" },
    //   { label: "Ukraine", value: "UA" },
    //   { label: "United Arab Emirates", value: "AE" },
    //   { label: "United Kingdom", value: "GB" },
    //   { label: "United States", value: "US" },
    //   { label: "United States Minor Outlying Islands", value: "UM" },
    //   { label: "Uruguay", value: "UY" },
    //   { label: "Uzbekistan", value: "UZ" },
    //   { label: "Vanuatu", value: "VU" },
    //   { label: "Venezuela", value: "VE" },
    //   { label: "Viet Nam", value: "VN" },
    //   { label: "Virgin Islands, British", value: "VG" },
    //   { label: "Virgin Islands, U.S.", value: "VI" },
    //   { label: "Wallis and Futuna", value: "WF" },
    //   { label: "Western Sahara", value: "EH" },
    //   { label: "Yemen", value: "YE" },
    //   { label: "Zambia", value: "ZM" },
    //   { label: "Zimbabwe", value: "ZW" }
    // ];

    // //Province List

    // this.provinceList = [
    //   { label: "Punjab ", value: "Punjab" },
    //   { label: "Pakhtoon Khuwah  ", value: "KPK" },
    //   { label: "Sindh ", value: "Sindh " },
    //   { label: "Balouchistan  ", value: "Balouchistan " },
    //   { label: "Gilgit Baltistan ", value: "Gilgit Baltistan" }
    // ];

    // //City List

    // this.cityList = [
    //   { label: "Islamabad ", value: "Islamabad" },
    //   { label: "Lahore", value: "Lahore" },
    //   { label: "Peshawer", value: "Peshawer" },
    //   { label: "Karachi ", value: "Karachi " },
    //   { label: "Quetta  ", value: "Quetta " },
    //   { label: "Gilgit", value: "Gilgit" }
    // ];

    // //District List

    // this.districtList = [
    //   { label: "Attock ", value: "Attock" },
    //   { label: "Gujranwala", value: "Gujranwala" },
    //   { label: "Faisalabad ", value: "Faisalabad " },
    //   { label: "Jhelum  ", value: "Jhelum " },
    //   { label: "Sialkot", value: "Sialkot" },
    // ];


    //Email Types
    this.emailType = [
      { label: 'Personal Email', value: 'Personal Email' },
      { label: 'Office Email', value: 'Office Email' }
    ];
  }

  ngOnInit() {
    // //Creating Array of ComboBox "branches"
    // this.contactForm = this.fb.group({
    //   branches: this.fb.array([])
    // });

    // //Creating Array of ComboBox "branchAddresses"
    // this.addressForm = this.fb.group({
    //   branchAddresses: this.fb.array([])
    // });

    // this.addBranchContact();
    // this.addBranchAddress();
    // alert("Address Details length = " + this.addressDetail.length);
    // alert("Contact Details length = " + this.contactDetail.length);
    // alert("Email Details length = " + this.emailDetail.length);

  }


  @ViewChild("excelDataContent") public excelDataContent: IgxGridComponent;//For excel
  @ViewChild("exportPDF") public exportPDF: ElementRef;// for pdf

  //@ViewChild("addressObj") public addressObj: AddressComponent;

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
    else if (this.branchCity.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch City', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else if (this.branchWebsite.trim() == "") {
      this.toastr.errorToastr('Please Enter Branch Website', 'Error', { toastTimeout: (2500) });
      return false;
    }
    // contact type conditions
    // else if (this.addObj.contactDetail.length == 0) {
    //   this.toastr.errorToastr('Please Add Contact Info Type', 'Error', { toastTimeout: (2500) });
    //   return false;
    // }

    else {

      //this.validObj.sendMessage();

      this.addObj.firstValidation();

      //this.myEvent.emit(null);

      //this.addressObj.firstValidation();
      //alert("Before");
      //this.validObj.onAddressComponentButtonClick();
      alert("branch after");
      // this.addressObj.firstValidation();
      // this.addressObj.secondValidation();

      //this.validObj.validate();
      //this.validObj.onAddressComponentButtonClick();
      // // address type conditions
      // if (this.addressDetail.length > 0) {
      //   for (let i = 0; i < this.addressDetail.length; i++) {
      //     if (this.addressDetail[i].addressType.trim() == "") {
      //       this.toastr.errorToastr('Please Select Address Type', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //     else if (this.addressDetail[i].address.trim() == "") {
      //       this.toastr.errorToastr('Please Enter Address', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //     else if (this.addressDetail[i].countryCode.trim() == "") {
      //       this.toastr.errorToastr('Please Select Country', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //     else if (this.addressDetail[i].provinceCode.trim() == "") {
      //       this.toastr.errorToastr('Please Select Province', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //     else if (this.addressDetail[i].districtCode.trim() == "") {
      //       this.toastr.errorToastr('Please Select District', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //     else if (this.addressDetail[i].cityCode.trim() == "") {
      //       this.toastr.errorToastr('Please Select City', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //   }
      // }
      // // contact type conditions
      // if (this.contactDetail.length > 0) {
      //   for (let i = 0; i < this.contactDetail.length; i++) {
      //     if (this.contactDetail[i].contactType.trim() == "") {
      //       this.toastr.errorToastr('Please Select Contact Type', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //     else if (this.contactDetail[i].countryPhoneCode.trim() == "countryCode") {
      //       this.toastr.errorToastr('Please Select Country Code', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //     else if (this.contactDetail[i].contactCode.trim() == "") {
      //       this.toastr.errorToastr('Please Select Contact Code', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //     else if (this.contactDetail[i].contactNumber.trim() == "") {
      //       this.toastr.errorToastr('Please Enter Contact Number', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //   }
      // }
      // // email type conditions
      // if (this.emailDetail.length > 0) {
      //   for (let i = 0; i < this.emailDetail.length; i++) {
      //     if (this.emailDetail[i].type.trim() == "") {
      //       this.toastr.errorToastr('Please Select Email Type', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //     else if (this.emailDetail[i].email.trim() == "") {
      //       this.toastr.errorToastr('Please Enter Email', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //     else if (this.isEmail(this.emailDetail[i].email.trim()) == false) {
      //       this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
      //       return false;
      //     }
      //   }
      // }

      //this.addContact();

      // alert(this.branchId);

      if (this.branchId != "") {
        this.app.showSpinner();
        this.app.hideSpinner();
        this.toastr.successToastr('Updated Successfully', 'Success', { toastTimeout: (2500) });
        this.clear();
        //this.contactDetail=[];
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
        this.toastr.successToastr('saved successfully', 'Success', { toastTimeout: (2500) });
        this.clear();
        //this.contactDetail=[];
        $('#branchModal').modal('hide');
        this.app.hideSpinner();

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
      this.toastr.errorToastr('Please enter city label', 'Error', { toastTimeout: (2500) });
      return false;
    }
    else {
      let data = this.cities.find(x => x.ctyName == this.cityName);

      if (data != undefined) {
        this.toastr.errorToastr('City label already exist', 'Error', { toastTimeout: (2500) });
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

        // var updateData = { "sectionlabel": this.cityName };

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

    //return false;

    this.branchId = 0;
    this.branchType = '';
    this.branchTitle = '';
    //this.branchAddress = '';
    this.branchCity = '';
    // this.branchEmail = '';
    // this.branchPhone = '';
    // this.branchMobile = '';
    // this.branchFax = '';
    this.branchWebsite = '';

    // this.addressDetail = [];
    // this.contactDetail = [];
    // this.emailDetail = [];

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
        countryPhoneCode: "countryCode",
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
    //this.branchAddress = item.branAddress;
    this.branchCity = item.ctyId.toString();
    // this.branchEmail = item.branEmail;
    // this.branchPhone = item.branPhone;
    // this.branchMobile = item.branMobile;
    // this.branchFax = item.branFax;
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

    return false;

  }


  //For Exce File
  public downloadExcel() {
    return false;

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
      countryPhoneCode: "countryCode",
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

  // clearContact() {

  //   this.branchContactType = '';
  //   this.branchCountryCode = '';
  //   this.branchAreaCode = '';
  //   this.branchMobileNetworkCode = '';
  //   this.branchContactNumber = '';
  // }

  // editContact(item) {
  //   this.branchContactType = item.branchContactType;
  //   this.branchCountryCode = item.branchCountryCode;
  //   this.branchAreaCode = item.branchAreaCode;
  //   this.branchMobileNetworkCode = item.branchMobileNetworkCode;
  //   this.branchContactNumber = item.branchContactNumber;
  // }


  // addBranchGroup() {
  //   return this.fb.group({
  //     //menuComboText: [''],
  //     branchContactType: ['', Validators.required],
  //     branchCountryCode: ['', Validators.required],
  //     branchAreaCode: [''],
  //     branchMobileNetworkCode: [''],
  //     branchContactNumber: ['', Validators.required]
  //     //menuCombo: ['', Validators.required]
  //   })
  // }

  // Add New ComboBox to an array()
  // addBranchContact() {
  //   this.branchValue.push(this.addBranchGroup());
  // }

  //Getting new ComboBox from array and show in front page
  // get branchValue() {
  //   return <FormArray>this.contactForm.get('branches');
  // }

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


  //*--------------------------------Address-------------------------------//

  // onChangeAddress(addressType) {

  //   //alert(contactType.value(index.toString()));

  //   if (addressType == "Work") {
  //     this.work = true;
  //     this.shipping = false;
  //     this.postal = false;
  //   }
  //   else if (addressType == "Shipping") {
  //     this.work = false;
  //     this.shipping = true;
  //     this.postal = false;
  //   }
  //   else if (addressType == "Postal") {
  //     this.work = false;
  //     this.shipping = false;
  //     this.postal = true;
  //   }
  //   else {
  //     return;
  //   }
  // }

  // addBranchGroupAddress() {
  //   return this.fb.group({
  //     //menuComboText: [''],
  //     branchWork: ['', Validators.required],
  //     branchShipping: ['', Validators.required],
  //     branchPostal: ['', Validators.required]
  //     //menuCombo: ['', Validators.required]
  //   })
  // }

  // // Add New ComboBox to an array()
  // addBranchAddress() {
  //   this.branchAddressValue.push(this.addBranchGroupAddress());
  // }

  // //Getting new ComboBox from array and show in front page
  // get branchAddressValue() {
  //   return <FormArray>this.addressForm.get('branchAddresses');
  // }

  // //Deleting every comboBox with specific id which is ([formGroupName]="i")
  // deleteBranchAddress(i) {
  //   this.branchAddressValue.removeAt(i);
  //   //alert(i);
  //   //alert(this.contactFormBranch.get('menuCombo.areaName'));
  //   //alert(this.branchValue[i]);
  // }

  // greetStudent() {
  //   this.validObj.sendMessage("Good Morning");
  // }
  // appreciateStudent() {
  //   this.validObj.sendMessage("Well Done");
  // }

}
