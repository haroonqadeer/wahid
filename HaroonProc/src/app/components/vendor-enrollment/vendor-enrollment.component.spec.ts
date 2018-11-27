import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEnrollmentComponent } from './vendor-enrollment.component';

describe('VendorEnrollmentComponent', () => {
  let component: VendorEnrollmentComponent;
  let fixture: ComponentFixture<VendorEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
