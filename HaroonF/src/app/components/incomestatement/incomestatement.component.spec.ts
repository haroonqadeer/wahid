/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IncomestatementComponent } from './incomestatement.component';

describe('IncomestatementComponent', () => {
  let component: IncomestatementComponent;
  let fixture: ComponentFixture<IncomestatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomestatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomestatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
