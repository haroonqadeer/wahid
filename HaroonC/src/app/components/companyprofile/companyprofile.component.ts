import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.scss']
})
export class CompanyprofileComponent implements OnInit {

  edited = '';
  txtCurrency = '';
  txtCountry = '';
  

  constructor() { }

  ngOnInit() {
  }

  saveCurrency(){
    
  }

}
