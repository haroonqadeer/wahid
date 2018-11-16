import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFixComponent } from './pay-fix.component';

describe('PayFixComponent', () => {
  let component: PayFixComponent;
  let fixture: ComponentFixture<PayFixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
