import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringagreementComponent } from './hiringagreement.component';

describe('HiringagreementComponent', () => {
  let component: HiringagreementComponent;
  let fixture: ComponentFixture<HiringagreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringagreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
