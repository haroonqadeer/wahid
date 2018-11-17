import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRDashboardComponent } from './hrdashboard.component';

describe('HRDashboardComponent', () => {
  let component: HRDashboardComponent;
  let fixture: ComponentFixture<HRDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
