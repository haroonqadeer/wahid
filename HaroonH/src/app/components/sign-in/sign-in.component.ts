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

  serverUrl = "http://localhost:3004/";

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
    } else if (this.txtFirstName.trim().length == 0) {
      this.toastr.errorToastr('Please Enter Password', 'Oops!', { toastTimeout: (2500) });
      return false;
    } else if (this.txtMiddleName.trim().length == 0) {
      this.toastr.errorToastr('Please Enter User Name', 'Oops!', { toastTimeout: (2500) });
      return false;
    } else if (this.txtLastName.trim().length == 0) {
      this.toastr.errorToastr('Please Enter Password', 'Oops!', { toastTimeout: (2500) });
      return false;
    } else if (this.txtPassword.trim().length == 0) {
      this.toastr.errorToastr('Please Enter Password', 'Oops!', { toastTimeout: (2500) });
      return false;
    } else {
      //localStorage.setItem('userName', data.userName);

      var saveData = {
        email: this.txtEmail,
        firstName: this.txtFirstName,
        middleName: this.txtMiddleName,
        lastName: this.txtLastName,
        userPsswrd: this.txtPassword,
        cmpnyID: localStorage.getItem("cmpnyID")
      };

      var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.serverUrl + 'api/saveUser', saveData, { headers: reqHeader }).subscribe((data: any) => {

        if (data.msg != undefined) {
          this.toastr.successToastr(data.msg, 'Success!', { toastTimeout: (2500) });
          //this.app.hideSpinner();
          this.router.navigate(['/login']);
          this.clear();
          return false;
        } else {
          this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
          //$('#companyModal').modal('hide');
          //this.app.hideSpinner();
          return false;
        }
      });


    }
  }

  clear() {

    this.txtEmail = "";
    this.txtFirstName = "";
    this.txtLastName = "";
    this.txtMiddleName = "";
    this.txtPassword = "";

  }
}
