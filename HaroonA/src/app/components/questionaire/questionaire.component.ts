import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.scss']
})
export class QuestionaireComponent implements OnInit {

  public edited = false;
  public edited1 = false;

  txtPassword = '';
  txtPin = '';

  constructor() { }

  ngOnInit() {}

}
