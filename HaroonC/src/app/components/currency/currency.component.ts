import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

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

    //* variables for display values on page



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
        { currencyId: '3', currencyName: 'Pound', countryName: 'England' }
    ];

    constructor(private toastr: ToastrManager, private http: HttpClient) { }

    ngOnInit() {
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
                this.toastr.successToastr('updated successfully', 'Error', { toastTimeout: (2500) });
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

    //function for get all saved currencies from db
    getCurrency() {

        return false;

        var Token = localStorage.getItem(this.tokenKey);

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });

        this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
            this.currencies = data
        });

    }

}
