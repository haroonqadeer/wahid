
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
//import { AppComponent } from 'src/app/app.component';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {

    serverUrl = "http://localhost:3004/";
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

            var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

            this.http.get(this.serverUrl + 'api/getUsers?userName=' + this.txtUserName + '&psswrd=' + this.txtPassword, { headers: reqHeader }).subscribe((data: any) => {

                //this.jobVcncyQual = data;
                //alert(data[0].indvdlID); return;
                if (data == "") {
                    this.toastr.errorToastr('User Name & Password Not Found!', 'Oops!', { toastTimeout: (2500) });
                    return;
                } else {
                    localStorage.setItem('indvdlID', data[0].indvdlID);
                    localStorage.setItem('userName', data[0].firstName);
                    this.toastr.successToastr('Login Successfully!', 'Success!', { toastTimeout: (2500) });
                    this.router.navigate(['/onlineJobProfile']);
                    return;
                }
            });
            //this.router.navigate(['/onlineJobProfile']);

        }
    }

    getKeyPressed(e) {
        if (e.keyCode == 13) {
            this.onSubmit();
        }
    }
}
