import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { AppComponent } from '../../app.component';
import { OrderPipe } from 'ngx-order-pipe';

import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;
//declare// function showLoader(): any;

@Component({
    selector: 'app-subsidiarie',
    templateUrl: './subsidiarie.component.html',
    styleUrls: ['./subsidiarie.component.scss']
})
export class SubsidiarieComponent implements OnInit {

    serverUrl = "http://localhost:55536/";
    tokenKey = "token";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

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
    address = '';
    cmbCity = '';
    email = '';
    telephone = '';
    mobile = '';
    website = '';
    faxNumber = '';
    agreement = '';

    txtdPassword = '';
    txtdPin = '';

    //* variables for pagination and orderby pipe
    p = 1;
    order = 'info.name';
    reverse = false;
    sortedCollection: any[];
    itemPerPage = '10';


    //*List Variables
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


    constructor(private toastr: ToastrManager, private http: HttpClient, private app: AppComponent, private spinner: NgxSpinnerService) { }

    ngOnInit() {
    }

    //Function for save and update currency 
    save() {

        if (this.subsidiaryTitle.trim() == '') {
            this.toastr.errorToastr('Please enter subsidiary title', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.ntn.trim() == '' || this.ntn.length < 8) {
            this.toastr.errorToastr('Please enter NTN', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.strn.trim() == '' || this.strn.length < 10) {
            this.toastr.errorToastr('Please enter STRM', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.cmbSubsidiaryType == '') {
            this.toastr.errorToastr('Please subsidiary type', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.representator.trim() == '') {
            this.toastr.errorToastr('Please enter representator', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.address.trim() == '') {
            this.toastr.errorToastr('Please enter address', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.cmbCity == '') {
            this.toastr.errorToastr('Please select city', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.email.trim() == '') {
            this.toastr.errorToastr('Please enter email', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.isEmail(this.email.trim()) == false) {
            this.toastr.errorToastr('Invalid email', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.telephone == '' || this.telephone.length < 10) {
            this.toastr.errorToastr('Please enter telephone', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.mobile == '' || this.mobile.length < 11) {
            this.toastr.errorToastr('Please enter mobile', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.website.trim() == '') {
            this.toastr.errorToastr('Please enter website', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.faxNumber == '' || this.faxNumber.length < 10) {
            this.toastr.errorToastr('Please enter fax number', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.agreement == '') {
            this.toastr.errorToastr('Please attach agreement copy', 'Error', { toastTimeout: (2500) });
            return false;
        }


        else {

            if (this.subsidiaryId != '') {
                this.showSpinner();
                this.hideSpinner();
                this.toastr.successToastr('updated successfully', 'Success', { toastTimeout: (2500) });
                this.clear();
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


            } else {
                this.showSpinner();
                this.hideSpinner();
                this.toastr.successToastr('saved successfully', 'Success', { toastTimeout: (2500) });
                this.clear();
                return false;


                var saveData = { "Password": this.txtdPassword, "PIN": this.txtdPin };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                this.http.post(this.serverUrl + 'api/pwCreate', saveData, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record saved Successfully', 'Success!', { toastTimeout: (2500) });
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
        this.address = '';
        this.cmbCity = '';
        this.email = '';
        this.telephone = '';
        this.mobile = '';
        this.website = '';
        this.faxNumber = '';
        this.agreement = '';

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
        this.address = item.address;
        this.cmbCity = item.cityId.toString();
        this.email = item.email;
        this.telephone = item.telephone;
        this.mobile = item.mobile;
        this.website = item.website;
        this.faxNumber = item.faxNumber;
        this.agreement = item.agreement;

    }

    //functions for delete currency
    deleteTemp(item) {

        this.dSubsidiaryId = item.subsidiaryDetailId;

    }

    delete() {

        if (this.txtdPassword == '') {
            this.toastr.errorToastr('Please enter password', 'Error', { toastTimeout: (2500) });
            return false
        } else if (this.txtdPin == '') {
            this.toastr.errorToastr('Please enter PIN', 'Error', { toastTimeout: (2500) });
            return false
        } else if (this.dSubsidiaryId == '') {
            this.toastr.errorToastr('Invalid delete request', 'Error', { toastTimeout: (2500) });
            return false
        } else {

            this.showSpinner();
            this.hideSpinner();
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

    //function for get all saved currencies from db
    getSubsidiaryDetail() {

        return false;

        var Token = localStorage.getItem(this.tokenKey);

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });

        this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
            this.cities = data
        });

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
                this.showSpinner();
                this.hideSpinner();

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
