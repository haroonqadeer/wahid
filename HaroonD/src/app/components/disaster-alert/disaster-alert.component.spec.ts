import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisasterAlertComponent } from './disaster-alert.component';

describe('DisasterAlertComponent', () => {
  let component: DisasterAlertComponent;
  let fixture: ComponentFixture<DisasterAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisasterAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisasterAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
