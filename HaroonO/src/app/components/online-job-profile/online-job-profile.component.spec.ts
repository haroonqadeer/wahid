import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineJobProfileComponent } from './online-job-profile.component';

describe('OnlineJobProfileComponent', () => {
  let component: OnlineJobProfileComponent;
  let fixture: ComponentFixture<OnlineJobProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineJobProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineJobProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
