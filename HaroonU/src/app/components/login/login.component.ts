import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';

import {MessageService} from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  txtUserName = '';
  txtPassword = '';

  isLoginError : boolean = false;
  
  constructor(public toastr: ToastrManager, private userService : UserService, private router : Router) { }


  ngOnInit() {

  }
  OnSubmit(){
    

    // this.messageService.add({severity:'error', summary: 'Error Message', detail:'Incorrect Data'});
    // return false;

    this.toastr.successToastr('This is success toast.', 'Success!', {toastTimeout: (2000)});
    this.toastr.errorToastr('This is error toast.', 'Oops!', {toastTimeout: (2500)});
    this.toastr.warningToastr('This is warning toast.', 'Alert!', {toastTimeout: (3000)});
    this.toastr.infoToastr('This is info toast.', 'Info', {toastTimeout: (3500)});
    return false;
    
    if(this.txtUserName.trim().length == 0)
    {
      this.isLoginError = true;
      window.alert('User Name is Empty');return false;
    }
    else if(this.txtPassword.trim().length == 0)
    {
      window.alert('Password is Empty');return false;
    }
    else
    {
      this.userService.userAuthentication(this.txtUserName,this.txtPassword).subscribe((data : any) =>{
        localStorage.setItem('userToken',data.access_token);
        this.router.navigate(['/dashboard']);
      },
      (err : HttpErrorResponse) =>{
        //this.messageService.add({severity:'error', summary: 'Error Message', detail:'User Name & Password is Incorrect'});

        localStorage.setItem('userName',this.txtUserName);
        this.router.navigate(['/dashboard']);
      }
      //(err : HttpErrorResponse) =>{
        //this.isLoginError = true;
      //}
      )
    }
  }
}
