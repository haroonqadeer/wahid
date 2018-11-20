import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousehiringComponent } from './househiring.component';

describe('HousehiringComponent', () => {
  let component: HousehiringComponent;
  let fixture: ComponentFixture<HousehiringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousehiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousehiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
