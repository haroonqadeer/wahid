import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  // serverUrl = "http://localhost:3003/";
  serverUrl = "http://192.168.200.19:3012/";

  jobVcncy = [];
  jobVcncyQual = [];
  jobQualDegree = [];
  jobQualCertificate = [];
  jobQualSkill = [];

  constructor(
    private toastr: ToastrManager,
    private app: AppComponent,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {

    this.getJobVcncy();
    this.getJobVcncyQualification();

  }

  onAccordionCLick(item) {

    this.jobQualDegree = [];
    this.jobQualCertificate = [];
    this.jobQualSkill = [];

    for (var i = 0; i < this.jobVcncyQual.length; i++) {
      if (item == this.jobVcncyQual[i].jobDesigID && this.jobVcncyQual[i].qlfctnTypeName == "Degree") {
        this.jobQualDegree.push({
          reqdQlfctnRuleNo: this.jobVcncyQual[i].reqdQlfctnRuleNo,
          jobPostLocationCd: this.jobVcncyQual[i].jobPostLocationCd,
          jobPostDeptCd: this.jobVcncyQual[i].jobPostDeptCd,
          jobDesigID: this.jobVcncyQual[i].jobDesigID,
          qlfctnRuleCriteriaCd: this.jobVcncyQual[i].qlfctnRuleCriteriaCd,
          qlfctnCriteriaCd: this.jobVcncyQual[i].qlfctnCriteriaCd,
          qlfctnCd: this.jobVcncyQual[i].qlfctnCd,
          qlfctnTypeCd: this.jobVcncyQual[i].qlfctnTypeCd,
          prefIndctr: this.jobVcncyQual[i].prefIndctr,
          qlfctnCriteriaReqdLvl: this.jobVcncyQual[i].qlfctnCriteriaReqdLvl,
          qlfctnCriteriaMaxLvl: this.jobVcncyQual[i].qlfctnCriteriaMaxLvl,
          qlfctnCriteriaName: this.jobVcncyQual[i].qlfctnCriteriaName,
          qlfctnName: this.jobVcncyQual[i].qlfctnName,
          qlfctnTypeName: this.jobVcncyQual[i].qlfctnTypeName,
        });
      }
      if (item == this.jobVcncyQual[i].jobDesigID && this.jobVcncyQual[i].qlfctnTypeName == "Certificate") {
        this.jobQualCertificate.push({
          reqdQlfctnRuleNo: this.jobVcncyQual[i].reqdQlfctnRuleNo,
          jobPostLocationCd: this.jobVcncyQual[i].jobPostLocationCd,
          jobPostDeptCd: this.jobVcncyQual[i].jobPostDeptCd,
          jobDesigID: this.jobVcncyQual[i].jobDesigID,
          qlfctnRuleCriteriaCd: this.jobVcncyQual[i].qlfctnRuleCriteriaCd,
          qlfctnCriteriaCd: this.jobVcncyQual[i].qlfctnCriteriaCd,
          qlfctnCd: this.jobVcncyQual[i].qlfctnCd,
          qlfctnTypeCd: this.jobVcncyQual[i].qlfctnTypeCd,
          prefIndctr: this.jobVcncyQual[i].prefIndctr,
          qlfctnCriteriaReqdLvl: this.jobVcncyQual[i].qlfctnCriteriaReqdLvl,
          qlfctnCriteriaMaxLvl: this.jobVcncyQual[i].qlfctnCriteriaMaxLvl,
          qlfctnCriteriaName: this.jobVcncyQual[i].qlfctnCriteriaName,
          qlfctnName: this.jobVcncyQual[i].qlfctnName,
          qlfctnTypeName: this.jobVcncyQual[i].qlfctnTypeName,
        });
      }
      if (item == this.jobVcncyQual[i].jobDesigID && this.jobVcncyQual[i].qlfctnTypeName == "Skills") {
        this.jobQualSkill.push({
          reqdQlfctnRuleNo: this.jobVcncyQual[i].reqdQlfctnRuleNo,
          jobPostLocationCd: this.jobVcncyQual[i].jobPostLocationCd,
          jobPostDeptCd: this.jobVcncyQual[i].jobPostDeptCd,
          jobDesigID: this.jobVcncyQual[i].jobDesigID,
          qlfctnRuleCriteriaCd: this.jobVcncyQual[i].qlfctnRuleCriteriaCd,
          qlfctnCriteriaCd: this.jobVcncyQual[i].qlfctnCriteriaCd,
          qlfctnCd: this.jobVcncyQual[i].qlfctnCd,
          qlfctnTypeCd: this.jobVcncyQual[i].qlfctnTypeCd,
          prefIndctr: this.jobVcncyQual[i].prefIndctr,
          qlfctnCriteriaReqdLvl: this.jobVcncyQual[i].qlfctnCriteriaReqdLvl,
          qlfctnCriteriaMaxLvl: this.jobVcncyQual[i].qlfctnCriteriaMaxLvl,
          qlfctnCriteriaName: this.jobVcncyQual[i].qlfctnCriteriaName,
          qlfctnName: this.jobVcncyQual[i].qlfctnName,
          qlfctnTypeName: this.jobVcncyQual[i].qlfctnTypeName,
        });
      }
    }
  }

  getJobVcncy() {
    //return false;

    //var Token = localStorage.getItem(this.tokenKey);

    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get(this.serverUrl + 'api/getJobVcncy', { headers: reqHeader }).subscribe((data: any) => {

      this.jobVcncy = data;
    });
  }

  getJobVcncyQualification() {
    //return false;

    //var Token = localStorage.getItem(this.tokenKey);

    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get(this.serverUrl + 'api/getJobVcncyQualification', { headers: reqHeader }).subscribe((data: any) => {

      this.jobVcncyQual = data;
    });
  }

  onApply(item) {

    localStorage.removeItem('jobDesigID');
    localStorage.removeItem('vcncyID');
    localStorage.removeItem('cmpnyID');
    localStorage.removeItem('jobPostVcncyID');
    localStorage.removeItem('jobDesigName');

    localStorage.setItem('jobDesigID', item);

    for (var i = 0; i < this.jobVcncy.length; i++) {
      if (item == this.jobVcncy[i].jobDesigID) {
        localStorage.setItem('vcncyID', this.jobVcncy[i].vcncyID);
        localStorage.setItem('cmpnyID', this.jobVcncy[i].cmpnyID);
        localStorage.setItem('jobPostVcncyID', this.jobVcncy[i].jobPostVcncyID);
        localStorage.setItem('jobDesigName', this.jobVcncy[i].jobDesigName);

        i = this.jobVcncy.length + 1;
      }
    }
    this.router.navigate(['/login']);

    //alert(localStorage.getItem('vcncyID'));
  }
}
