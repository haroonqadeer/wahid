import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCriteriaComponent } from './registration-criteria.component';

describe('RegistrationCriteriaComponent', () => {
  let component: RegistrationCriteriaComponent;
  let fixture: ComponentFixture<RegistrationCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
