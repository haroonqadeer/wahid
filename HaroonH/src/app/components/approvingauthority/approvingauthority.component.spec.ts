import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovingauthorityComponent } from './approvingauthority.component';

describe('ApprovingauthorityComponent', () => {
  let component: ApprovingauthorityComponent;
  let fixture: ComponentFixture<ApprovingauthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovingauthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovingauthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
