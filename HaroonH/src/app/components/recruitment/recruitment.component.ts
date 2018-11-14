import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Chart } from 'angular-highcharts';

//use in status combobox
export interface Status {
  sId: string;
  sName: string;
}
@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  Line_chart: Chart;

  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
  formGroup5: FormGroup;
  formGroup6: FormGroup;

  //use in party combobox
  status: Status[] = [
    {sId: '1', sName: 'Accept'},
    {sId: '2', sName: 'Reject'},
    {sId: '3', sName: 'Short List'},
    {sId: '4', sName: 'Waiting'}
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
        data: [10,32]
      },{
        name: 'VB.Net',
        data: [15,20]
      }]
    });
    this.Line_chart = chart;
  }
}
