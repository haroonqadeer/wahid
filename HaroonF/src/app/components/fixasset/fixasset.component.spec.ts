import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixassetComponent } from './fixasset.component';

describe('FixassetComponent', () => {
  let component: FixassetComponent;
  let fixture: ComponentFixture<FixassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
