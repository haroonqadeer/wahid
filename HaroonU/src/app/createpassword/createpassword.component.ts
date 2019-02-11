import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpassword',
  templateUrl: './createpassword.component.html',
  styleUrls: ['./createpassword.component.scss']
})
export class CreatepasswordComponent implements OnInit {

  txtloginName = '';
  txtPassword = '';
  txtCnfrmPassword = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
  savePassword() {
    this.router.navigate(['']);
  }
}
