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

  serverUrl = "http://localhost:3003/";

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

    this.getJobVcncyQualification();
  }

  saveInfo(stepper: MatStepper) {
    stepper.next();
  }


  getJobVcncyQualification() {
    //return false;

    //var Token = localStorage.getItem(this.tokenKey);

    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get(this.serverUrl + 'api/getJobVcncyQualification', { headers: reqHeader }).subscribe((data: any) => {

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
            passingYear: null
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
            passingYear: null
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
          });
        }
      }
    });
  }

}
