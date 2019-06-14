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

  p = 1;
  // itemPerPage = '1';

  public questions = [];
  public testQuestions = [];

  constructor(
    private toastr: ToastrManager,
    private app: AppComponent,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.gettestQuestions();
    // this.questions = [
    //   {
    //     id: "1",
    //     question: "What is your Name?",
    //     option01Id: "11",
    //     option01: "Haroon Qadeer",
    //     option02Id: "12",
    //     option02: "Nabeel Farman",
    //     option03Id: "13",
    //     option03: "Adnan Ali",
    //     option04Id: "14",
    //     option04: "Aamir Qureshi"
    //   },
    //   {
    //     id: "2",
    //     question: "What is your City Name?",
    //     option01Id: "21",
    //     option01: "Islamabad",
    //     option02Id: "22",
    //     option02: "Rawalpindi",
    //     option03Id: "23",
    //     option03: "Faisalabad",
    //     option04Id: "24",
    //     option04: "Fateh Jang"
    //   }
    // ]
  }

  gettestQuestions() {

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get(this.serverUrl + 'api/getTestQuestions?rn=3&jobDesigID=15&jobPostDeptCd=3&jobPostLocCd=1', { headers: reqHeader }).subscribe((data: any) => {

      this.testQuestions = data;
      for (var i = 0; i < data.length; i++) {
        this.questions.push({
          id: i + 1,
          question: data[i].testQuesText,
          option01Id: "1",
          option01: data[i].one,
          option02Id: "2",
          option02: data[i].two,
          option03Id: "3",
          option03: data[i].three,
          option04Id: "4",
          option04: data[i].four
        })
      }
    });
  }

  getNextItem(item) {

    for (var i = 1; i <= this.questions.length; i++) {
      if (item == i && item != this.questions.length) {
        this.p = i + 1;
        i = this.questions.length + 1;
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
  }
}
