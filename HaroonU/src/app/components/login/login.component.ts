import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from '../../app.component';
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

    serverUrl = "http://localhost:55536/";
    tokenKey = "token";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    txtUserName = '';
    txtPassword = '';

    constructor(private http: HttpClient, private formBuilder: FormBuilder, public toastr: ToastrManager, private router: Router, private Idle: AppComponent) { }


    ngOnInit() {

        if (localStorage.getItem('token') != null) {
            this.router.navigate(['/dashboard']);
        }

    }

    onSubmit() {

        if (this.txtUserName.trim().length == 0) {
            this.toastr.errorToastr('Please Enter User Name', 'Oops!', { toastTimeout: (2500) });
            return false;
        }
        else if (this.txtPassword.trim().length == 0) {
            this.toastr.errorToastr('Please Enter Password', 'Oops!', { toastTimeout: (2500) });
            return false;
        }
        else {

            var data = { "loginname": this.txtUserName, "password": this.txtPassword };

            var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

            this.http.post(this.serverUrl + 'api/token', data, { headers: reqHeader }).subscribe((data: any) => {

                if (data.msg != undefined) {
                    this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                    return false;
                } else {
                    this.Idle.startWatching();
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userName', data.userName);
                    this.router.navigate(['/dashboard']);
                }
            });

        }
    }
}
