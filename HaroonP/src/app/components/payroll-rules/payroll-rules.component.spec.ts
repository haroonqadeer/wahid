import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollRulesComponent } from './payroll-rules.component';

describe('PayrollRulesComponent', () => {
  let component: PayrollRulesComponent;
  let fixture: ComponentFixture<PayrollRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
