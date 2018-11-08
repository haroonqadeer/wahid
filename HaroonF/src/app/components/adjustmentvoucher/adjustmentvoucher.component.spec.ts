import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentvoucherComponent } from './adjustmentvoucher.component';

describe('AdjustmentvoucherComponent', () => {
  let component: AdjustmentvoucherComponent;
  let fixture: ComponentFixture<AdjustmentvoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustmentvoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
