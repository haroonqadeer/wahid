import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollConComponent } from './payroll-con.component';

describe('PayrollConComponent', () => {
  let component: PayrollConComponent;
  let fixture: ComponentFixture<PayrollConComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollConComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
