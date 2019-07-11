import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-online-test',
  templateUrl: './online-test.component.html',
  styleUrls: ['./online-test.component.scss']
})
export class OnlineTestComponent implements OnInit {

  serverUrl = "http://localhost:3003/";
  // serverUrl = "http://192.168.200.19:3012/";

  isValid = true;
  hideDiv = true;
  hideSubmit = false;
  p = 1;
  // itemPerPage = '1';
  lblEmail = "";
  lblFullName = "";
  lblJobTitle = "";
  rdbOptID = 0;

  public questions = [];
  public testQuestions = [];
  public appTest = [];

  constructor(
    private toastr: ToastrManager,
    private app: AppComponent,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.app.getUserDetail(localStorage.getItem('userName'));
    this.gettestQuestions();
    this.app.showDiv();

    this.lblEmail = this.app.empEmail;
    this.lblFullName = this.app.empFullName;
    this.lblJobTitle = localStorage.getItem('jobDesigName');
  }

  gettestQuestions() {

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get(this.serverUrl + 'api/getTestQuestions?rn=3&jobDesigID=15&jobPostDeptCd=3&jobPostLocCd=1', { headers: reqHeader }).subscribe((data: any) => {

      this.testQuestions = data;
      for (var i = 0; i < data.length; i++) {
        this.questions.push({
          id: i + 1,
          appPrcCd: data[i].apprvngPrcssCd,
          testQuesID: data[i].testQuesID,
          testSbjctCd: data[i].testSbjctCd,
          question: data[i].testQuesText,
          optionId: null,
          option01: data[i].one,
          // option02Id: "2",
          option02: data[i].two,
          // option03Id: "3",
          option03: data[i].three,
          // option04Id: "4",
          option04: data[i].four,
          correctOption: data[i].correctOption
        })
      }
    });
  }

  getNextItem(item) {
    var itemFound = false;
    var itemIndex = 0;
    var appTestIndex = 0;

    if (this.p == this.questions.length) {
      this.hideDiv = false;
      this.hideSubmit = true;
    }

    for (var i = 1; i <= this.questions.length; i++) {
      if (item == i && item != this.questions.length) {
        this.p = i + 1;
        i = this.questions.length + 1;
      }
    }

    if (this.p > 1) {
      this.isValid = false;
    }

    if (this.appTest.length == 0) {
      this.appTest.push({
        id: item,
        optID: this.rdbOptID,
        appPrcCd: this.questions[0].appPrcCd,
        testQuesID: this.questions[0].testQuesID,
        testSbjctCd: this.questions[0].testSbjctCd,
        correctOption: this.questions[0].correctOption,
        appID: this.app.empId,
        jobVcncyID: localStorage.getItem('jobPostVcncyID')
      })
      i = this.questions.length + 1;
    } else {
      for (var i = 0; i < this.questions.length; i++) {
        if (item == this.questions[i].id) {
          itemIndex = i;
          i = this.questions.length + 1;
        }
      }
      for (var i = 0; i < this.appTest.length; i++) {
        if (this.appTest[i].testQuesID == this.questions[itemIndex].testQuesID) {
          itemFound = true;
          appTestIndex = i;
          i = this.appTest.length + 1;
        }
      }

      if (itemFound == true) {
        var index = this.appTest.indexOf(this.appTest[appTestIndex]);
        this.appTest.splice(index, 1);

        this.appTest.push({
          id: item,
          optID: this.rdbOptID,
          appPrcCd: this.questions[itemIndex].appPrcCd,
          testQuesID: this.questions[itemIndex].testQuesID,
          testSbjctCd: this.questions[itemIndex].testSbjctCd,
          correctOption: this.questions[itemIndex].correctOption,
          appID: this.app.empId,
          jobVcncyID: localStorage.getItem('jobPostVcncyID')
        })
      } else {

        this.appTest.push({
          id: item,
          optID: this.rdbOptID,
          appPrcCd: this.questions[itemIndex].appPrcCd,
          testQuesID: this.questions[itemIndex].testQuesID,
          testSbjctCd: this.questions[itemIndex].testSbjctCd,
          correctOption: this.questions[itemIndex].correctOption,
          appID: this.app.empId,
          jobVcncyID: localStorage.getItem('jobPostVcncyID')
        })
      }

    }

    for (var j = 0; j < this.appTest.length; j++) {
      // alert(this.p + ' - ' + this.appTest[j].id);
      if (this.p == this.appTest[j].id) {
        this.rdbOptID = this.appTest[j].optID;
        j = this.appTest.length + 1;
      } else {
        this.rdbOptID = 0;
      }
    }
  }

  getPreviousItem(item) {

    for (var i = 1; i <= this.questions.length; i++) {
      if (item == i && item >= 0) {
        this.p = i - 1;
        i = this.questions.length + 1;
      }
    }

    // alert('p: ' + this.p);
    // alert('appTest length: ' + this.appTest.length);
    if (this.p == 1) {
      this.isValid = true;
    }

    for (var i = 0; i < this.questions.length; i++) {
      if (this.p == this.questions[i].id) {
        for (var j = 0; j < this.appTest.length; j++) {
          if (this.p == this.appTest[j].id) {
            this.rdbOptID = this.appTest[j].optID;
          }
        }
      }

    }
  }

  saveTest() {

    var saveData = {
      jobQualList: JSON.stringify(this.appTest)
    };

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.serverUrl + 'api/saveTest', saveData, { headers: reqHeader }).subscribe((data: any) => {

      if (data.msg != undefined) {
        this.toastr.successToastr(data.msg, 'Success!', { toastTimeout: (2500) });
        //this.app.hideSpinner();
        this.app.Logout();
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
