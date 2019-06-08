import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  txtEmail = "";
  txtFirstName = "";
  txtMiddleName = "";
  txtLastName = "";
  txtPassword = "";

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  save() {

    if (this.txtEmail.trim().length == 0) {
      this.toastr.errorToastr('Please Enter User Name', 'Oops!', { toastTimeout: (2500) });
      return false;
    } else if (this.txtFirstName == "") {
      this.toastr.errorToastr('Please Enter Password', 'Oops!', { toastTimeout: (2500) });
      return false;
    } else if (this.txtMiddleName.trim().length == 0) {
      this.toastr.errorToastr('Please Enter User Name', 'Oops!', { toastTimeout: (2500) });
      return false;
    } else if (this.txtLastName == "") {
      this.toastr.errorToastr('Please Enter Password', 'Oops!', { toastTimeout: (2500) });
      return false;
    } else if (this.txtPassword == "") {
      this.toastr.errorToastr('Please Enter Password', 'Oops!', { toastTimeout: (2500) });
      return false;
    } else {
      //localStorage.setItem('userName', data.userName);
      this.router.navigate(['/login']);

    }
  }
}
