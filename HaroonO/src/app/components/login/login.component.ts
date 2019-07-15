
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
//import { AppComponent } from 'src/app/app.component';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {

    serverUrl = "http://localhost:9010/";
    // serverUrl = "http://192.168.200.19:3010/";

    // serverUrl = "http://localhost:11664/";
    // serverUrl = "http://192.168.200.19:3006/";
    // tokenKey = "token";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    txtUserName = '';
    txtPassword = '';

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private app: AppComponent,
        public toastr: ToastrManager,
        private router: Router,
        // private app: AppComponent
    ) { }


    ngOnInit() {

        // this.app.checkLogin('Yes');
    }

    onSubmit() {

        if (this.txtUserName.trim().length == 0) {
            this.toastr.errorToastr('Please Enter User Name', 'Oops!', { toastTimeout: (2500) });
            return false;
        }
        else if (this.txtPassword == "") {
            this.toastr.errorToastr('Please Enter Password', 'Oops!', { toastTimeout: (2500) });
            return false;
        }
        else {

            this.app.showSpinner();

            var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

            var loginData = { "IndvdlERPUsrID": this.txtUserName, "IndvdlERPPsswrd": this.txtPassword };

            this.http.post(this.serverUrl + 'api/chkLogin', loginData, { headers: reqHeader }).subscribe((data: any) => {

                //this.jobVcncyQual = data;
                // alert(data[0].locationCd); return;
                if (data.msg == "Login Successfully!") {
                    this.toastr.successToastr(data.msg, 'Success!', { toastTimeout: (2500) });

                    this.app.hideSpinner();

                    localStorage.setItem('userName', this.txtUserName);
                    // localStorage.setItem('myActModNam', 'HR');
                    this.app.checkLogin('Yes');
                    // this.app.branchList = data.userDetail;
                    // this.app.locationId = data.userDetail[0].locationCd;
                    // this.app.cmpnyId = data.userDetail[0].cmpnyId;
                    // this.app.cmpnyName = data.userDetail[0].locationName;

                } else {

                    this.app.hideSpinner();

                    this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                    $(".mat-form-field-underline").css("background-color", "red");
                    $(".mat-form-field-label").css("color", "red");
                }

                // if (data == "") {
                //     this.toastr.errorToastr('User Name & Password Not Found!', 'Oops!', { toastTimeout: (2500) });
                //     return;
                // } else {
                //     var token = "1";
                //     localStorage.setItem('indvdlID', data[0].indvdlID);
                //     localStorage.setItem('userName', data[0].firstName);
                //     localStorage.setItem('fullName', data[0].fullName);
                //     localStorage.setItem('email', data[0].email);
                //     localStorage.setItem('token', token);

                //     this.toastr.successToastr('Login Successfully!', 'Success!', { toastTimeout: (2500) });
                //     this.router.navigate(['/onlineJobProfile']);
                //     return;
                // }
            });
            //this.router.navigate(['/onlineJobProfile']);

        }
    }

    getKeyPressed(e) {
        if (e.keyCode == 13) {
            this.onSubmit();
        }
    }

    signUp() {
        this.router.navigate(['/signUp']);
    }
}
