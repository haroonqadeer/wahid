import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserServiceService } from '../../shared/user-service.service';
import { AppComponent } from '../../app.component';

var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;

    txtUserName = '';
    txtPassword = '';

    constructor(private userService: UserServiceService, private formBuilder: FormBuilder, public toastr: ToastrManager, private router : Router, private Idle: AppComponent) { }

    ngOnInit() { 

        //if user already loged in
        if(localStorage.getItem('token') != null){
            this.router.navigate(['/dashboard']);
        }
        
    }
    
    onSubmit(){

        // this.toastr.successToastr('This is success toast.', 'Success!', {toastTimeout: (2000)});
        // this.toastr.errorToastr('This is error toast.', 'Oops!', {toastTimeout: (2500)});
        // this.toastr.warningToastr('This is warning toast.', 'Alert!', {toastTimeout: (3000)});
        // this.toastr.infoToastr('This is info toast.', 'Info', {toastTimeout: (3500)});
        
        if(this.txtUserName.trim().length == 0)
        {
            this.toastr.errorToastr('Please Enter User Name', 'Oops!', {toastTimeout: (2500)});
            return false;
        }
        else if(this.txtPassword.trim().length == 0)
        {
            this.toastr.errorToastr('Please Enter Password', 'Oops!', {toastTimeout: (2500)});
            return false;
        }
        else
        {
            this.userService.postUser(this.txtUserName,this.txtPassword).subscribe((data : any) =>{

                if(data.msg != undefined){
                    this.toastr.errorToastr(data.msg,'Error!', {toastTimeout: (2500)});
                    return false;
                }else{
                    this.Idle.startWatching();
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('userName', data.userName);
                    this.router.navigate(['/dashboard']);
                }
            });
        }
    }
}
