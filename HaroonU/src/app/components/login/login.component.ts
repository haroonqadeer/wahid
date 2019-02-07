import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

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

  constructor(private formBuilder: FormBuilder, public toastr: ToastrManager, private router : Router) { }

  ngOnInit() { }
  
  // convenience getter for easy access to form fields
  get u() { return this.loginForm.controls; }
  
  onSubmit(){
    
    // this.messageService.add({severity:'error', summary: 'Error Message', detail:'Incorrect Data'});
    // return false;


    // this.toastr.successToastr('This is success toast.', 'Success!', {toastTimeout: (2000)});
    // this.toastr.errorToastr('This is error toast.', 'Oops!', {toastTimeout: (2500)});
    // this.toastr.warningToastr('This is warning toast.', 'Alert!', {toastTimeout: (3000)});
    // this.toastr.infoToastr('This is info toast.', 'Info', {toastTimeout: (3500)});
    
    if(this.txtUserName.trim().length == 0)
    {
      //this.isLoginError = true;
      this.toastr.errorToastr('Please Enter Correct User Name', 'Oops!', {toastTimeout: (2500)});return false;
    }
    else if(this.txtPassword.trim().length == 0)
    {
      this.toastr.errorToastr('Please Enter Correct Password', 'Oops!', {toastTimeout: (2500)});return false;return false;
    }
    else
    {
      return false;
      // this.userService.userAuthentication(this.txtUserName,this.txtPassword).subscribe((data : any) =>{
      //   localStorage.setItem('userToken',data.access_token);
      //   this.router.navigate(['/dashboard']);
      // },
      // (err : HttpErrorResponse) =>{
      //   //this.messageService.add({severity:'error', summary: 'Error Message', detail:'User Name & Password is Incorrect'});

      //   localStorage.setItem('userName',this.txtUserName);
      //   this.router.navigate(['/dashboard']);
      // }
      //(err : HttpErrorResponse) =>{
        //this.isLoginError = true;
      //}
      // )
    }
  }

  validatePassword(password){
    // Do not show anything when the length of password is zero.
    if (password.length === 0) {
      document.getElementById("msg").innerHTML = "";
      return;
    }
    // Create an array and push all possible values that you want in password
    var matchedCase = new Array();
    matchedCase.push("[$@$!%*#?&]"); // Special Charector
    matchedCase.push("[A-Z]");      // Uppercase Alpabates
    matchedCase.push("[0-9]");      // Numbers
    matchedCase.push("[a-z]");     // Lowercase Alphabates

    // Check the conditions
    var ctr = 0;
    for (var i = 0; i < matchedCase.length; i++) {
        if (new RegExp(matchedCase[i]).test(password)) {
            ctr++;
        }
    }
    // Display it
    var color = "";
    var strength = "";
    switch (ctr) {
        case 0:
        case 1:
        case 2:
            strength = "Weak Password";
            color = "red";
            break;
        case 3:
            strength = "Medium Password";
            color = "orange";
            break;
        case 4:
            strength = "Strong Password";
            color = "green";
            break;
    }
    document.getElementById("msg").innerHTML = strength;
    document.getElementById("msg").style.color = color;
  }
}
