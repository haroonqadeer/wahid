import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'angular-highcharts';

//use in status combobox
export interface Status {
  sId: string;
  sName: string;
}

//use in Officer combobox
export interface Officer {
  oId: string;
  oName: string;
}

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {

  // edited = false;
  // edited1 = false;

  Line_chart: Chart;

  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
  formGroup5: FormGroup;
  formGroup6: FormGroup;

  //use in status combobox
  status: Status[] = [
    { sId: '1', sName: 'Accept' },
    { sId: '2', sName: 'Reject' },
    { sId: '3', sName: 'Short List' },
    { sId: '4', sName: 'Waiting' }
  ]

  //use in officers combobox
  officers: Officer[] = [
    { oId: '1', oName: 'Ali' },
    { oId: '2', oName: 'Razzaq' },
    { oId: '3', oName: 'Fahad' },
    { oId: '4', oName: 'Moin' }
  ]

  //use in types combobox
  types: Officer[] = [
    { oId: '1', oName: 'Ali' },
    { oId: '2', oName: 'Razzaq' },
    { oId: '3', oName: 'Fahad' },
    { oId: '4', oName: 'Moin' }
  ]

  cmbCType = '';
  cmbStatus = '';
  txtNumber = '';
  txtRemarks = '';


  // For Applications
  applicants = [
    {
      appId: 1,
      appName: "Areeb Zaidi",
      receivedOn: "Jan 8, 2019",
      appMatch: "Good",
      appStatus: "In-Process"
    },
    {
      appId: 2,
      appName: "Zain ul Abideen",
      receivedOn: "Jan 10, 2019",
      appMatch: "Good",
      appStatus: "In-Process"
    },
    {
      appId: 3,
      appName: "Ijaz ul Haq",
      receivedOn: "Jan 10, 2019",
      appMatch: "Good",
      appStatus: "In-Process"
    },
    {
      appId: 4,
      appName: "Ali Imran",
      receivedOn: "Jan 13, 2019",
      appMatch: "Good",
      appStatus: "In-Process"
    },
    {
      appId: 5,
      appName: "Shakeel Zaman",
      receivedOn: "Jan 13, 2019",
      appMatch: "Good",
      appStatus: "In-Process"
    },
    {
      appId: 6,
      appName: "Waqas Khan",
      receivedOn: "Jan 15, 2019",
      appMatch: "Good",
      appStatus: "In-Process"
    },
    {
      appId: 7,
      appName: "Umair Ali",
      receivedOn: "Jan 16, 2019",
      appMatch: "Good",
      appStatus: "In-Process"
    }
  ]
  // For Short Listed Applicants for Test
  shortListTest = [
    {
      lstTestId: 1,
      appId: 1,
      appName: "Areeb Zaidi",
      initScreenMarks: 10,
      appStatus: "In-Process"
    },
    {
      lstTestId: 2,
      appId: 2,
      appName: "Zain ul Abideen",
      initScreenMarks: 8,
      appStatus: "In-Process"
    },
    {
      lstTestId: 3,
      appId: 3,
      appName: "Ijaz ul Haq",
      initScreenMarks: 6,
      appStatus: "In-Process"
    },
    {
      lstTestId: 4,
      appId: 4,
      appName: "Ali Imran",
      initScreenMarks: 15,
      appStatus: "In-Process"
    },
    {
      lstTestId: 5,
      appId: 5,
      appName: "Shakeel Zaman",
      initScreenMarks: 5,
      appStatus: "In-Process"
    }
  ]
  // For Tests
  tests = [
    {
      testId: 1,
      appId: 1,
      appName: "Areeb Zaidi",
      testSource: "Web",
      testMarks: 70,
      appStatus: "In-Process"
    },
    {
      testId: 2,
      appId: 2,
      appName: "Zain ul Abideen",
      testSource: "Web",
      testMarks: 68,
      appStatus: "In-Process"
    },
    {
      testId: 3,
      appId: 3,
      appName: "Ijaz ul Haq",
      testSource: "Web",
      testMarks: 50,
      appStatus: "In-Process"
    },
    {
      testId: 4,
      appId: 4,
      appName: "Ali Imran",
      testSource: "Web",
      testMarks: 90,
      appStatus: "In-Process"
    },
    {
      testId: 5,
      appId: 5,
      appName: "Shakeel Zaman",
      testSource: "Web",
      testMarks: 45,
      appStatus: "In-Process"
    }
  ]
  // For Short Listed Appicants for Interview
  sListInterview = [
    {
      listInterId: 1,
      appId: 1,
      appName: "Areeb Zaidi",
      screeningMarks: 10,
      testMarks: 70,
      appStatus: "In-Process"
    },
    {
      listInterId: 2,
      appId: 2,
      appName: "Zain ul Abideen",
      screeningMarks: 8,
      testMarks: 68,
      appStatus: "In-Process"
    },
    {
      listInterId: 3,
      appId: 4,
      appName: "Ali Imran",
      screeningMarks: 15,
      testMarks: 90,
      appStatus: "In-Process"
    }
  ]
  // For Interview
  interviews = [
    {
      interviewId: 1,
      appId: 1,
      appName: "Areeb Zaidi",
      interviewerA: 6,
      interviewerB: 6,
      interviewerC: 6,
      appStatus: "In-Process"
    },
    {
      interviewId: 2,
      appId: 2,
      appName: "Zain ul Abideen",
      interviewerA: 5,
      interviewerB: 5,
      interviewerC: 5,
      appStatus: "In-Process"
    },
    {
      interviewId: 3,
      appId: 4,
      appName: "Ali Imran",
      interviewerA: 7,
      interviewerB: 8,
      interviewerC: 8,
      appStatus: "In-Process"
    }
  ]
  // For Appointment
  appointments = [
    {
      appointId: 1,
      appId: 4,
      appName: "Ali Imran",
      appointInitScreening: 75,
      appointTestMarks: 90,
      appointInterviewAvgMarks: 7.5,
      appStatus: "Completed"
    }
  ]



  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      cmbCType: ['', Validators.required]
    });
    this.formGroup2 = this._formBuilder.group({
      scndCtrl: ['', Validators.required]
    });
    this.formGroup3 = this._formBuilder.group({
      thrdCtrl: ['', Validators.required]
    });
    this.formGroup4 = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.formGroup5 = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
    this.formGroup6 = this._formBuilder.group({
      sixthCtrl: ['', Validators.required]
    });

    this.LineChart_init();
  }

  LineChart_init() {

    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Graph'
      },
      xAxis: {
        categories: ['English', 'VB.Net']
      },
      yAxis: {
        title: {
          text: 'Required Skills'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'English',
        data: [1, 4]
      }, {
        name: 'VB.Net',
        data: [2, 5]
      }]
    });
    this.Line_chart = chart;
  }
}
