import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-online-job-profile',
  templateUrl: './online-job-profile.component.html',
  styleUrls: ['./online-job-profile.component.scss']
})
export class OnlineJobProfileComponent implements OnInit {

  // serverUrl = "http://localhost:9033/";
  serverUrl = "http://localhost:3003/";
  // serverUrl = "http://52.163.189.189:9033/";

  docLink = "abc";
  txtFullName = "";
  txtCNIC = "";
  txtFatherName = "";
  txtMobile = "";
  txtTelephone = "";
  txtAddress = "";
  cmbGender = "";
  genderList = [];
  jobQualDegree = [];
  jobQualCertificate = [];
  jobQualSkill = [];

  constructor(
    private toastr: ToastrManager,
    private app: AppComponent,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.app.getUserDetail(localStorage.getItem('userName'));
    this.app.showDiv();
    this.getJobVcncyQualification();
  }

  saveInfo(stepper: MatStepper) {

    if (this.txtFullName.trim().length == 0) {
      this.toastr.errorToastr('Please Enter Full Name', 'Error', { toastTimeout: (2500) });
      return;
    } else if (this.txtCNIC.trim().length == 0) {
      this.toastr.errorToastr('Please Enter CNIC Name', 'Error', { toastTimeout: (2500) });
      return;
    } else if (this.txtCNIC.trim().length < 13) {
      this.toastr.errorToastr('Please Enter CNIC Name', 'Error', { toastTimeout: (2500) });
      return;
    } else if (this.txtFatherName.trim().length == 0) {
      this.toastr.errorToastr('Please Enter Father Name', 'Error', { toastTimeout: (2500) });
      return;
    } else if (this.cmbGender == "") {
      this.toastr.errorToastr('Please Select Gender', 'Error', { toastTimeout: (2500) });
      return;
    } else if (this.txtMobile.trim().length == 0) {
      this.toastr.errorToastr('Please Enter Mobile', 'Error', { toastTimeout: (2500) });
      return;
    } else if (this.txtAddress.trim().length == 0) {
      this.toastr.errorToastr('Please Enter Address', 'Error', { toastTimeout: (2500) });
      return;
    } else {

      this.app.showSpinner();

      var saveData = {
        fullName: this.txtFullName,
        cnic: this.txtCNIC,
        fatherName: this.txtFatherName,
        gender: this.cmbGender,
        mobile: this.txtMobile,
        telephone: this.txtTelephone,
        address: this.txtAddress,
        jobPostVcncyID: localStorage.getItem("jobPostVcncyID"),
        vcncyID: localStorage.getItem("vcncyID"),
        indvdlID: localStorage.getItem('empID')
      };

      var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.serverUrl + 'api/updateUser', saveData, { headers: reqHeader }).subscribe((data: any) => {

        if (data.msg != undefined) {
          this.toastr.successToastr(data.msg, 'Success!', { toastTimeout: (2500) });
          this.getJobVcncyQualification();
          this.app.hideSpinner();
          stepper.next();
          return false;
        } else {
          this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
          //$('#companyModal').modal('hide');
          this.app.hideSpinner();
          return false;
        }
      });


    }

  }

  saveQualification(stepper: MatStepper) {

    for (var i = 0; i < this.jobQualDegree.length; i++) {

      if (this.jobQualDegree[i].avail == null || this.jobQualDegree[i].avail == " ") {
        this.toastr.errorToastr('Please Enter Avail!  ', 'Error!', { toastTimeout: (2500) });
        return;
      } else if (this.jobQualDegree[i].passingYear == null || this.jobQualDegree[i].passingYear == " ") {
        this.toastr.errorToastr('Please Enter Passing Year!  ', 'Error!', { toastTimeout: (2500) });
        return;
      } else if (this.jobQualDegree[i].passingYear > (new Date()).getFullYear()) {
        this.toastr.errorToastr('Passing Year is greater than Current Year!  ', 'Error!', { toastTimeout: (2500) });
        return;
      } else if (((new Date()).getFullYear() - this.jobQualDegree[i].passingYear) > 30) {
        this.toastr.errorToastr('Passing Year cannot older than 30 years!  ', 'Error!', { toastTimeout: (2500) });
        return;
      }
      // alert((new Date()).getFullYear() - this.jobQualDegree[i].passingYear);
    }

    // return;

    this.app.showSpinner();

    var saveData = {
      jobQualList: JSON.stringify(this.jobQualDegree),
      docLink: this.docLink
    };

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.serverUrl + 'api/saveApplicantQualification', saveData, { headers: reqHeader }).subscribe((data: any) => {

      if (data.msg == "Record Saved Successfully!") {
        this.toastr.successToastr(data.msg, 'Success!', { toastTimeout: (2500) });
        this.app.hideSpinner();
        stepper.next();
        return false;
      } else {
        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
        //$('#companyModal').modal('hide');
        this.app.hideSpinner();
        return false;
      }
    });

  }

  saveCertification(stepper: MatStepper) {

    for (var i = 0; i < this.jobQualCertificate.length; i++) {

      if (this.jobQualCertificate[i].avail == null || this.jobQualCertificate[i].avail == " ") {
        this.toastr.errorToastr('Please Enter Avail!  ', 'Error!', { toastTimeout: (2500) });
        return;
      } else if (this.jobQualCertificate[i].passingYear == null || this.jobQualCertificate[i].passingYear == " ") {
        this.toastr.errorToastr('Please Enter Passing Year!  ', 'Error!', { toastTimeout: (2500) });
        return;
      } else if (this.jobQualCertificate[i].passingYear > (new Date()).getFullYear()) {
        this.toastr.errorToastr('Passing Year is greater than Current Year!  ', 'Error!', { toastTimeout: (2500) });
        return;
      } else if (((new Date()).getFullYear() - this.jobQualCertificate[i].passingYear) > 30) {
        this.toastr.errorToastr('Passing Year cannot older than 30 years!  ', 'Error!', { toastTimeout: (2500) });
        return;
      }
    }

    this.app.showSpinner();

    var saveData = {
      jobQualList: JSON.stringify(this.jobQualCertificate),
      docLink: this.docLink
    };

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.serverUrl + 'api/saveApplicantQualification', saveData, { headers: reqHeader }).subscribe((data: any) => {

      if (data.msg == "Record Saved Successfully!") {
        this.toastr.successToastr(data.msg, 'Success!', { toastTimeout: (2500) });
        this.app.hideSpinner();
        stepper.next();
        return false;
      } else {
        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
        //$('#companyModal').modal('hide');
        this.app.hideSpinner();
        return false;
      }
    });

  }

  saveSkill(stepper: MatStepper) {

    for (var i = 0; i < this.jobQualSkill.length; i++) {

      if (this.jobQualSkill[i].avail == null || this.jobQualSkill[i].avail == " ") {
        this.toastr.errorToastr('Please Enter Avail!  ', 'Error!', { toastTimeout: (2500) });
        return;
      }
    }

    this.app.showSpinner();

    var saveData = {
      jobQualList: JSON.stringify(this.jobQualSkill),
      docLink: this.docLink
    };

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.serverUrl + 'api/saveApplicantQualification', saveData, { headers: reqHeader }).subscribe((data: any) => {

      if (data.msg == "Record Saved Successfully!") {
        this.toastr.successToastr(data.msg, 'Success!', { toastTimeout: (2500) });
        this.app.hideSpinner();
        stepper.next();
        return false;
      } else {
        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
        //$('#companyModal').modal('hide');
        this.app.hideSpinner();
        return false;
      }
    });

  }

  getJobVcncyQualification() {
    //return false;

    this.jobQualDegree = [];
    this.jobQualCertificate = [];
    this.jobQualSkill = [];
    //var Token = localStorage.getItem(this.tokenKey);

    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get(this.serverUrl + 'api/getJobVcncyQualification', { headers: reqHeader }).subscribe((data: any) => {

      // alert(data.length)
      for (var i = 0; i < data.length; i++) {

        if (localStorage.getItem('jobDesigID') == data[i].jobDesigID && data[i].qlfctnTypeName == "Degree") {
          this.jobQualDegree.push({
            reqdQlfctnRuleNo: data[i].reqdQlfctnRuleNo,
            jobPostLocationCd: data[i].jobPostLocationCd,
            jobPostDeptCd: data[i].jobPostDeptCd,
            jobDesigID: data[i].jobDesigID,
            qlfctnRuleCriteriaCd: data[i].qlfctnRuleCriteriaCd,
            qlfctnCriteriaCd: data[i].qlfctnCriteriaCd,
            qlfctnCd: data[i].qlfctnCd,
            qlfctnTypeCd: data[i].qlfctnTypeCd,
            prefIndctr: data[i].prefIndctr,
            qlfctnCriteriaReqdLvl: data[i].qlfctnCriteriaReqdLvl,
            qlfctnCriteriaMaxLvl: data[i].qlfctnCriteriaMaxLvl,
            qlfctnCriteriaName: data[i].qlfctnCriteriaName,
            qlfctnName: data[i].qlfctnName,
            qlfctnTypeName: data[i].qlfctnTypeName,
            avail: null,
            passingYear: null,
            applcntID: localStorage.getItem('empID'),
            jobPostVcncyID: localStorage.getItem('jobPostVcncyID')
          });
        }
        if (localStorage.getItem('jobDesigID') == data[i].jobDesigID && data[i].qlfctnTypeName == "Certificate") {
          this.jobQualCertificate.push({
            reqdQlfctnRuleNo: data[i].reqdQlfctnRuleNo,
            jobPostLocationCd: data[i].jobPostLocationCd,
            jobPostDeptCd: data[i].jobPostDeptCd,
            jobDesigID: data[i].jobDesigID,
            qlfctnRuleCriteriaCd: data[i].qlfctnRuleCriteriaCd,
            qlfctnCriteriaCd: data[i].qlfctnCriteriaCd,
            qlfctnCd: data[i].qlfctnCd,
            qlfctnTypeCd: data[i].qlfctnTypeCd,
            prefIndctr: data[i].prefIndctr,
            qlfctnCriteriaReqdLvl: data[i].qlfctnCriteriaReqdLvl,
            qlfctnCriteriaMaxLvl: data[i].qlfctnCriteriaMaxLvl,
            qlfctnCriteriaName: data[i].qlfctnCriteriaName,
            qlfctnName: data[i].qlfctnName,
            qlfctnTypeName: data[i].qlfctnTypeName,
            avail: null,
            passingYear: null,
            applcntID: localStorage.getItem('empID'),
            jobPostVcncyID: localStorage.getItem('jobPostVcncyID')
          });
        }
        if (localStorage.getItem('jobDesigID') == data[i].jobDesigID && data[i].qlfctnTypeName == "Skills") {
          this.jobQualSkill.push({
            reqdQlfctnRuleNo: data[i].reqdQlfctnRuleNo,
            jobPostLocationCd: data[i].jobPostLocationCd,
            jobPostDeptCd: data[i].jobPostDeptCd,
            jobDesigID: data[i].jobDesigID,
            qlfctnRuleCriteriaCd: data[i].qlfctnRuleCriteriaCd,
            qlfctnCriteriaCd: data[i].qlfctnCriteriaCd,
            qlfctnCd: data[i].qlfctnCd,
            qlfctnTypeCd: data[i].qlfctnTypeCd,
            prefIndctr: data[i].prefIndctr,
            qlfctnCriteriaReqdLvl: data[i].qlfctnCriteriaReqdLvl,
            qlfctnCriteriaMaxLvl: data[i].qlfctnCriteriaMaxLvl,
            qlfctnCriteriaName: data[i].qlfctnCriteriaName,
            qlfctnName: data[i].qlfctnName,
            qlfctnTypeName: data[i].qlfctnTypeName,
            avail: null,
            passingYear: null,
            applcntID: localStorage.getItem('empID'),
            jobPostVcncyID: localStorage.getItem('jobPostVcncyID')
          });
        }
      }
    });
  }

  clearInfo() {

    this.txtFullName = '';
    this.txtCNIC = '';
    this.txtFatherName = '';
    this.cmbGender = '';
    this.txtMobile = '';
    this.txtTelephone = '';
    this.txtAddress = '';
  }

  clearEducation() {

    for (var i = 0; i < this.jobQualDegree.length; i++) {
      this.jobQualDegree[i].avail = '';
      this.jobQualDegree[i].passingYear = '';
    }
  }

  clearCertificate() {

    for (var i = 0; i < this.jobQualCertificate.length; i++) {
      this.jobQualCertificate[i].avail = '';
      this.jobQualCertificate[i].passingYear = '';
    }
  }

  clearSkills() {

    for (var i = 0; i < this.jobQualSkill.length; i++) {
      this.jobQualSkill[i].avail = '';
      // this.jobQualSkill[i].passingYear = '';
    }
  }

  clearExperience() {

    // for (var i = 0; i < this.jobQualDegree.length; i++) {
    //   this.jobQualDegree[i].avail = '';
    //   this.jobQualDegree[i].passingYear = '';
    // }
  }
}
