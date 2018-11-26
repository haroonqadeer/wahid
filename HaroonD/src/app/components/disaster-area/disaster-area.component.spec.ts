import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisasterAreaComponent } from './disaster-area.component';

describe('DisasterAreaComponent', () => {
  let component: DisasterAreaComponent;
  let fixture: ComponentFixture<DisasterAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisasterAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisasterAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
